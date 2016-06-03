<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link http://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Twenty_Sixteen
 * @since Twenty Sixteen 1.0
 */

get_header(); ?>

<?php get_template_part( 'home/featured_content', get_post_format() ); ?>

<?php get_template_part( 'home/assos_infos_baseline', get_post_format() ); ?>

<?php get_template_part( 'home/assos_infos_general', get_post_format() ); ?>

<?php get_template_part( 'home/featured_videos', get_post_format() ); ?>

<?php get_template_part( 'home/parrains', get_post_format() ); ?>

<?php get_template_part( 'home/map', get_post_format() ); ?>

<!--?php get_sidebar(); ?-->
<?php get_footer(); ?>
