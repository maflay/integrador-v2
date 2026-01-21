<?php
header("Content-Type: application/json");

if (!isset($_FILES["avatar"])) {
  echo json_encode(["status" => "error", "mensaje" => "No llegó archivo"]);
  exit;
}

$file = $_FILES["avatar"];
if ($file["error"] !== UPLOAD_ERR_OK) {
  echo json_encode(["status" => "error", "mensaje" => "Error subiendo archivo"]);
  exit;
}

$mime = mime_content_type($file["tmp_name"]);
$allowed = ["image/jpeg", "image/png", "image/webp"];
if (!in_array($mime, $allowed)) {
  echo json_encode(["status" => "error", "mensaje" => "Formato no permitido"]);
  exit;
}

$MAX_SIZE = 300;
$QUALITY_WEBP = 70;
$publicHtml = dirname(__DIR__, 2);
$DIR = $publicHtml . "/uploads/avatars/";
if (!is_dir($DIR)) mkdir($DIR, 0755, true);

switch ($mime) {
  case "image/jpeg":
    $img = imagecreatefromjpeg($file["tmp_name"]);
    break;
  case "image/png":
    $img = imagecreatefrompng($file["tmp_name"]);
    imagepalettetotruecolor($img);
    imagealphablending($img, true);
    imagesavealpha($img, true);
    break;
  case "image/webp":
    $img = imagecreatefromwebp($file["tmp_name"]);
    break;
  default:
    echo json_encode(["status" => "error", "mensaje" => "Formato no soportado"]);
    exit;
}

$w = imagesx($img);
$h = imagesy($img);

$ratio = min($MAX_SIZE / $w, $MAX_SIZE / $h, 1);
$newW = (int)($w * $ratio);
$newH = (int)($h * $ratio);

$newImg = imagecreatetruecolor($newW, $newH);
imagealphablending($newImg, true);
imagesavealpha($newImg, true);
imagecopyresampled($newImg, $img, 0, 0, 0, 0, $newW, $newH, $w, $h);

$name = "avatar_" . time() . "_" . bin2hex(random_bytes(4)) . ".webp";
$path = $DIR . $name;

imagewebp($newImg, $path, $QUALITY_WEBP);

imagedestroy($img);
imagedestroy($newImg);

$baseUrl = (isset($_SERVER["HTTPS"]) ? "https://" : "http://") . $_SERVER["HTTP_HOST"];
$url = $baseUrl . "/uploads/avatars/" . $name;

echo json_encode([
  "status" => "success",
  "url" => $url,
  "size_kb" => round(filesize($path) / 1024, 1)
]);
