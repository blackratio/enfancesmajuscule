<div id="assos_general">
   <div class="wrapper_center">
      <div class="title_section">
         <h2>13 Novembre 2016</h2>
         <h3>De 9h à midi, le dimanche qui précède l'anniversaire de la convention des droits de l'enfant</h3>
      </div>
      <div class="clear">
         <div class="left_infos">
            <h4>
               Choisissez votre rythme, marche, petites foulées ou course et votre distance en multipliant à l'envie la boucle de base de 1 km.
            </h4>
         </div>
         <div class="center_infos">
            <h2>Au Parc de Rothschild</h2>
            <h3>A Boulogne-Billancourt (92100), dans le magnifique parc Edmond de Rothschild</h3>
         </div>
         <div class="right_infos">
            <?php if ( have_posts() ) : ?>

              <?php if ( is_home() && ! is_front_page() ) : ?>
                 <header>
                    <h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
                 </header>
              <?php endif; ?>

              <?php
              // Start the loop.
              while ( have_posts() ) : the_post();

                 /*
                  * Include the Post-Format-specific template for the content.
                  * If you want to override this in a child theme, then include a file
                  * called content-___.php (where ___ is the Post Format name) and that will be used instead.
                  */
                 get_template_part( 'template-parts/content_home', get_post_format() );

              // End the loop.
              endwhile;

              // Previous/next page navigation.
              the_posts_pagination( array(
                 'prev_text'          => __( 'Previous page', 'twentysixteen' ),
                 'next_text'          => __( 'Next page', 'twentysixteen' ),
                 'before_page_number' => '<span class="meta-nav screen-reader-text">' . __( 'Page', 'twentysixteen' ) . ' </span>',
              ) );

            // If no content, include the "No posts found" template.
            else :
              get_template_part( 'template-parts/content', 'none' );

            endif;
            ?>
         </div>
      </div>

   </div>
</div>
