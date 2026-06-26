<?php
/**
 * Twenty Twenty-Five functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_Five
 * @since Twenty Twenty-Five 1.0
 */

if ( ! function_exists( 'twentytwentyfive_post_format_setup' ) ) :
	/**
	 * Adds theme support for post formats.
	 *
	 * @since Twenty Twenty-Five 1.0
	 *
	 * @return void
	 */
	function twentytwentyfive_post_format_setup() {
		add_theme_support( 'post-formats', array( 'aside', 'audio', 'chat', 'gallery', 'image', 'link', 'quote', 'status', 'video' ) );
	}
endif;
add_action( 'after_setup_theme', 'twentytwentyfive_post_format_setup' );

if ( ! function_exists( 'twentytwentyfive_editor_style' ) ) :
	/**
	 * Enqueues editor-style.css in the editors.
	 *
	 * @since Twenty Twenty-Five 1.0
	 *
	 * @return void
	 */
	function twentytwentyfive_editor_style() {
		add_editor_style( 'assets/css/editor-style.css' );
	}
endif;
add_action( 'after_setup_theme', 'twentytwentyfive_editor_style' );

if ( ! function_exists( 'twentytwentyfive_enqueue_styles' ) ) :
	/**
	 * Enqueues the theme stylesheet on the front.
	 *
	 * @since Twenty Twenty-Five 1.0
	 *
	 * @return void
	 */
	function twentytwentyfive_enqueue_styles() {
		$suffix = SCRIPT_DEBUG ? '' : '.min';
		$src    = 'style' . $suffix . '.css';

		wp_enqueue_style(
			'twentytwentyfive-style',
			get_parent_theme_file_uri( $src ),
			array(),
			wp_get_theme()->get( 'Version' )
		);
		wp_style_add_data(
			'twentytwentyfive-style',
			'path',
			get_parent_theme_file_path( $src )
		);
	}
endif;
add_action( 'wp_enqueue_scripts', 'twentytwentyfive_enqueue_styles' );

if ( ! function_exists( 'twentytwentyfive_block_styles' ) ) :
	/**
	 * Registers custom block styles.
	 *
	 * @since Twenty Twenty-Five 1.0
	 *
	 * @return void
	 */
	function twentytwentyfive_block_styles() {
		register_block_style(
			'core/list',
			array(
				'name'         => 'checkmark-list',
				'label'        => __( 'Checkmark', 'twentytwentyfive' ),
				'inline_style' => '
				ul.is-style-checkmark-list {
					list-style-type: "\2713";
				}

				ul.is-style-checkmark-list li {
					padding-inline-start: 1ch;
				}',
			)
		);
	}
endif;
add_action( 'init', 'twentytwentyfive_block_styles' );

if ( ! function_exists( 'twentytwentyfive_pattern_categories' ) ) :
	/**
	 * Registers pattern categories.
	 *
	 * @since Twenty Twenty-Five 1.0
	 *
	 * @return void
	 */
	function twentytwentyfive_pattern_categories() {

		register_block_pattern_category(
			'twentytwentyfive_page',
			array(
				'label'       => __( 'Pages', 'twentytwentyfive' ),
				'description' => __( 'A collection of full page layouts.', 'twentytwentyfive' ),
			)
		);

		register_block_pattern_category(
			'twentytwentyfive_post-format',
			array(
				'label'       => __( 'Post formats', 'twentytwentyfive' ),
				'description' => __( 'A collection of post format patterns.', 'twentytwentyfive' ),
			)
		);
	}
endif;
add_action( 'init', 'twentytwentyfive_pattern_categories' );

if ( ! function_exists( 'twentytwentyfive_register_block_bindings' ) ) :
	/**
	 * Registers the post format block binding source.
	 *
	 * @since Twenty Twenty-Five 1.0
	 *
	 * @return void
	 */
	function twentytwentyfive_register_block_bindings() {
		register_block_bindings_source(
			'twentytwentyfive/format',
			array(
				'label'              => _x( 'Post format name', 'Label for the block binding placeholder in the editor', 'twentytwentyfive' ),
				'get_value_callback' => 'twentytwentyfive_format_binding',
			)
		);
	}
endif;
add_action( 'init', 'twentytwentyfive_register_block_bindings' );

if ( ! function_exists( 'twentytwentyfive_format_binding' ) ) :
	/**
	 * Callback function for the post format name block binding source.
	 *
	 * @since Twenty Twenty-Five 1.0
	 *
	 * @return string|void Post format name, or nothing if the format is 'standard'.
	 */
	function twentytwentyfive_format_binding() {
		$post_format_slug = get_post_format();

		if ( $post_format_slug && 'standard' !== $post_format_slug ) {
			return get_post_format_string( $post_format_slug );
		}
	}
endif;

add_action('add_meta_boxes', 'forzar_metabox_campos_personalizados');
function forzar_metabox_campos_personalizados() {
    add_meta_box('postcustom', 'Campos Personalizados (Datos de Oferta)', 'post_custom_meta_box', 'product', 'normal', 'high');
}

// Agregar botón de "Hacer Oferta" en la página de producto

add_action('wp_head', 'definir_ajax_url');
function definir_ajax_url() {
    echo '<script type="text/javascript"> var ajaxurl = "' . admin_url('admin-ajax.php') . '"; </script>';
}
add_action('woocommerce_after_add_to_cart_button', 'agregar_boton_oferta');
function agregar_boton_oferta() {
    global $product;
    if ( ! $product ) return;

    // 1. Imprimir el botón
    echo '<button class="single_add_to_cart_button button alt wp-element-button" style="margin-top: 10px;" type="button" id="btn-oferta" data-id="' . esc_attr($product->get_id()) . '">Hacer Oferta</button>';
    
    // 2. Imprimir el contenedor del formulario (oculto por defecto)
    echo '
    <div id="contenedor-modal-oferta" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:99999; justify-content:center; align-items:center;">
        <div style="background:#fff; padding:20px; border-radius:5px; width:300px; position:relative;">
            <span id="cerrar-modal-oferta" style="position:absolute; top:5px; right:10px; cursor:pointer; font-weight:bold;">&times;</span>
            <h3>Enviar una Oferta</h3>
            <form id="form-crear-oferta">
				<input type="hidden" name="id_producto" value="' . esc_attr($product->get_id()) . '">
				<label>' . esc_attr($product->get_name()) . '</label><br/>
				<label for="monto_oferta">Tu oferta ($):</label>
				<input type="number" id="monto_oferta" name="monto_oferta" required style="width:100%; margin-bottom:10px; margin-top:10px;" class="input-text qty text" placeholder="Oferta">
				<button type="button" class="single_add_to_cart_button button alt wp-element-button" id="btn_send_oferta" 							style="width:100%;" type="submit">Enviar Oferta</button>
			</form>
        </div>
    </div>
    ';
	
	echo '<script>
document.addEventListener("DOMContentLoaded", function() {
    var btn = document.getElementById("btn-oferta");
    var modal = document.getElementById("contenedor-modal-oferta");
    var cerrar = document.getElementById("cerrar-modal-oferta");
    var btn_send_oferta = document.getElementById("btn_send_oferta");

    if(btn) btn.addEventListener("click", () => modal.style.display = "flex");
    if(cerrar) cerrar.addEventListener("click", () => modal.style.display = "none");

    if(btn_send_oferta) {
        btn_send_oferta.addEventListener("click", function(e) {
            e.preventDefault();
            
            var formElement = this.closest("form");
            var formData = new FormData(formElement);
            formData.append("action", "procesar_oferta_ajax");

            // LOG DE DEBUG: Esto te dirá en F12 si los datos salen del navegador
            for (var pair of formData.entries()) {
                console.log("Enviando:", pair[0], pair[1]);
            }

            fetch(ajaxurl, {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    alert(data.data.message);
                    modal.style.display = "none";
                    location.reload();
                } else {
                    alert("Error: " + data.data.message);
                }
            })
            .catch(err => console.error("Error Fetch:", err));
        });
    }
});
</script>';
	
}

add_action('wp_ajax_procesar_oferta_ajax', 'procesar_oferta_ajax'); // Para usuarios logueados
add_action('wp_ajax_nopriv_procesar_oferta_ajax', 'procesar_oferta_ajax'); // Para invitados
function procesar_oferta_ajax() {
    $id_producto = intval($_POST['id_producto']);
    $monto = sanitize_text_field($_POST['monto_oferta']);
    $user_id = get_current_user_id(); // <-- Obtiene el ID de la sesión actual
    $user_email = wp_get_current_user()->user_email; // Opcional: guardamos el email

    if ($id_producto > 0) {
        // Guardamos el monto, el ID y el Email
        update_post_meta($id_producto, 'precio_oferta', $monto);
        update_post_meta($id_producto, 'usuario_oferta_id', $user_id); 
        update_post_meta($id_producto, 'usuario_oferta_email', $user_email);
        
        wp_send_json_success(['message' => 'Guardado exitosamente']);
    } else {
        wp_send_json_error(['message' => 'Error al guardar']);
    }
}


// Añadir columna de "Ofertas" en la lista de productos del Admin
add_filter('manage_edit-product_columns', 'agregar_columna_ofertas');
function agregar_columna_ofertas($columns) {
    $columns['oferta_custom'] = 'Precio Oferta';
    return $columns;
}


add_action('manage_product_posts_custom_column', 'mostrar_contenido_oferta', 10, 2);

function mostrar_contenido_oferta($column, $post_id) {
    // Debug: Verifica si al menos entra a la función
    if ($column == 'oferta_custom') {
        $valor = get_post_meta($post_id, 'precio_oferta', true);
        $email = get_post_meta($post_id, 'usuario_oferta_email', true);
        
        if (!empty($valor)) {
            echo '<strong>$' . $valor . '</strong><br><small>por: ' . $email . '</small>';
        } else {
            echo 'Sin oferta';
        }
    }
}


// Inyectar el dato de la oferta justo debajo del nombre del producto
add_filter( 'the_title', 'mostrar_oferta_en_nombre', 10, 2 );
function mostrar_oferta_en_nombre( $title, $post_id ) {
    // Verificamos que estamos en el administrador, editando productos, y es la tabla principal
    if ( is_admin() && get_post_type($post_id) === 'product' && !isset($_GET['post']) ) {
        
        $valor = get_post_meta($post_id, 'precio_oferta', true);
        $email = get_post_meta($post_id, 'usuario_oferta_email', true);
        
        if ( !empty($valor) ) {
            $title .= '<br><span style="color:red; font-size:11px; font-weight:bold;">Oferta: $' . esc_html($valor) . ' (' . esc_html($email) . ')</span>';
        }
    }
    return $title;
}

function obtener_todas_las_ofertas() {
    global $wpdb;
    
    $ofertas = $wpdb->get_results("
        SELECT post_id, meta_value, meta_id 
        FROM {$wpdb->postmeta} 
        WHERE meta_key = 'precio_oferta'
        ORDER BY meta_id DESC
    ");
    
    return $ofertas;
}

function mostrar_tabla_de_ofertas() {
    $ofertas = obtener_todas_las_ofertas();
    
    echo '<table class="tabla-ofertas">
	<thead>
            <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Monto</th>
                <th>User ID</th>
                <th>Email</th>
            </tr>
			</thead>';
    '<tbody>';
    foreach ($ofertas as $oferta) {
        $nombre_producto = get_the_title($oferta->post_id);
        $user_id_oferta = get_post_meta($oferta->post_id, 'usuario_oferta_id', true);
        $email_usuario = get_post_meta($oferta->post_id, 'usuario_oferta_email', true);
        
        echo '<tr>
                <td>' . esc_html($oferta->post_id) . '</td>
                <td>' . esc_html($nombre_producto) . '</td>
                <td>$' . esc_html($oferta->meta_value) . '</td>
                <td>' . esc_html($user_id_oferta) . '</td>
                <td>' . esc_html($email_usuario) . '</td>
              </tr>';
    }
	'</tbody>';
    echo '</table>';
}

function tiene_oferta($post_id) {
    $monto = get_post_meta($post_id, 'precio_oferta', true);
    return !empty($monto) ? $monto : false;
}

add_shortcode('tabla_ofertas', 'renderizar_shortcode_ofertas');

function renderizar_shortcode_ofertas() {
	
	if ( !current_user_can('manage_options') ) {
        wp_redirect( home_url() );
    }
    // Iniciamos la captura de salida
    ob_start();
    
    // Llamamos a tu función original
    mostrar_tabla_de_ofertas();
    
    // Devolvemos el contenido capturado
    return ob_get_clean();
}

add_shortcode('btn_ofertas', 'btn_know_ofertas');

function btn_know_ofertas() {
    // 1. Verificamos permisos
    if ( !current_user_can('manage_options') ) {
        return ""; // Si no es admin, no devuelve nada
    } 
    
    // 2. Retornamos el HTML en lugar de usar echo
    return '<a href="/lista-subasta" class="single_add_to_cart_button button alt wp-element-button" style="margin-top: 10px; display: inline-block;">Ver Ofertas</a>';
}