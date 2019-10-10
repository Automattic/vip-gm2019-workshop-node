<?php

/**
 * Hook to "refresh" (instead of invalidate) a Node.js endpoint
 * 
 * Avoids expiring the endpoint cache in Node.js; instead, this serves as notification
 * to the Node app that the category has changed
 * 
 * - the /food endpoint must be updated when any food post is updated
 * - hooks on save_post and sense a request with a special query param
 * - see the Node.js code for the rest of the implementation
 * 
 */

add_action( 'save_post', 'vipgm_maybe_refresh_foods' );

function vipgm_maybe_refresh_foods( $post_id ) {
	if ( wp_is_post_revision( $post_id ) ) {
		return;
        }

	if ( in_category( 2, $post_id ) ) {
		// refresh Node
		$args = [
			'blocking' => false,
			'timeout'  => 5,
		];
		// do not use cache for this request
		wp_remote_get( 'http://node:4000/food?refresh=true', $args );
	}
}
