<?php

add_action( 'save_post', 'vipgm_maybe_refresh_foods' );

function vipgm_maybe_refresh_foods( $post_id ) {
	if ( wp_is_post_revision( $post_id ) ) {
		return;
        }

	if ( in_category( 2, $post_id ) ) {
		error_log( 'hello' );
		// refresh Node
		$args = [
			'blocking' => false,
			'timeout'  => 5,
		];
		wp_remote_get( 'http://node:4000/food?refresh=true', $args );
	}
}
