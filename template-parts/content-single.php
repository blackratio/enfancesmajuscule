<?php
/**
 * The template part for displaying single posts
 *
 * @package WordPress
 * @subpackage Twenty_Sixteen
 * @since Twenty Sixteen 1.0
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<!--?php twentysixteen_post_thumbnail(); ?-->
	<div class="thumb" style="background-image: url(<?php the_post_thumbnail_url(); ?>)
"></div>
	<!--?php twentysixteen_excerpt(); ?-->

	<div class="entry-content">
		<header class="entry-header">
			<?php the_time('l j F  Y') ?>
			par <?php the_author(); ?>
			<h4>Category: <?php the_category(', ') ?></h4>
			<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
		</header><!-- .entry-header -->
		<?php
			the_content();

			wp_link_pages( array(
				'before'      => '<div class="page-links"><span class="page-links-title">' . __( 'Pages:', 'twentysixteen' ) . '</span>',
				'after'       => '</div>',
				'link_before' => '<span>',
				'link_after'  => '</span>',
				'pagelink'    => '<span class="screen-reader-text">' . __( 'Page', 'twentysixteen' ) . ' </span>%',
				'separator'   => '<span class="screen-reader-text">, </span>',
			) );

			if ( '' !== get_the_author_meta( 'description' ) ) {
				get_template_part( 'template-parts/biography' );
			}
		?>
	</div><!-- .entry-content -->


</article><!-- #post-## -->
