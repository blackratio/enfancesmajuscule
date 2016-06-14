<?php
/**
 * The template part for displaying content
 *
 * @package WordPress
 * @subpackage Twenty_Sixteen
 * @since Twenty Sixteen 1.0
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="meta">

		<!--?php
			edit_post_link(
				sprintf(
					/* translators: %s: Name of current post */
					__( 'Edit<span class="screen-reader-text"> "%s"</span>', 'twentysixteen' ),
					get_the_title()
				),
				'<span class="edit-link">',
				'</span>'
			);
		?-->
	</div>
	<div class="post_header clear">
		<?php if ( is_sticky() && is_home() && ! is_paged() ) : ?>
			<span class="sticky-post"><?php _e( 'Featured', 'twentysixteen' ); ?></span>
		<?php endif; ?>
		<a class="thumb" href="<?php the_permalink(); ?>" style="background-image: url(<?php the_post_thumbnail_url(); ?>)
"></a>
		<div class="content">
			<div class="meta">
				<?php twentysixteen_entry_meta(); ?>
			</div>
			<?php the_title( sprintf( '<h2><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h2>' ); ?>
			<?php twentysixteen_excerpt(); ?>
		</div>

	</div><!-- .entry-header -->




</article><!-- #post-## -->
