<div id="assos_general">
   <div class="wrapper_center">
      <div class="title_section">
         <h2>Infos</h2>
         <h3>Retrouvez toutes les informations importantes</h3>
      </div>
      <div class="clear generals">
         <div class="pourquoi general item1">

            <span class="fa fa-child"></span>
            <h2>Pourquoi ?</h2>
            <div class="content">
               <h3>LES DROITS DE L'ENFANT</h3>
               <h4>Une course pour l'anniversaire de la convention des droits de l'enfant du 20 novembre 1989.</h4>
            </div>
         </div>
         <div class="ou general item2">

            <span class="fa fa-map-marker"></span>
            <h2>Ou ?</h2>
            <div class="content">
               <h3>AU PARC DE ROTHSCHILD</h3>
               <h4>A Boulogne-Billancourt, 92100, dans le magnifique parc Edmond de Rothschild.</h4>
            </div>
         </div>
         <div class="quand general item3">

            <span class="fa fa fa-calendar-check-o"></span>
               <h2>Quand ?</h2>
            <div class="content">
               <h3>le 13 novembre 2016</h3>
               <h4>De 9h à midi, le dimanche qui précède l'anniversaire de la convention des droits de l'enfant</h4>
            </div>
         </div>
         <div class="comment general item4">

            <span class="fa fa-flag"></span>
            <h2>Comment ?</h2>
            <div class="content">
               <h3>UNE COURSE SUR MESURE !</h3>
               <h4>Choisissez votre rythme, marche, petites foulées ou course et votre distance en multipliant à l'envie la boucle de base de 1 km.</h4>
            </div>
         </div>

      </div>

         <div class="right_infos">
            <div id="home_blogpost">
               <h4>Derniers articles</h4>
               <div class="clear">
                  <?php if ( have_posts() ) : ?>

                     <?php
                     // Start the loop.
                     while ( have_posts() ) : the_post('posts_per_page=5');
                     /*
                     * Include the Post-Format-specific template for the content.
                     * If you want to override this in a child theme, then include a file
                     * called content-___.php (where ___ is the Post Format name) and that will be used instead.
                     */
                     get_template_part( 'template-parts/content_home', get_post_format() );

                     // End the loop.
                  endwhile;

                  // Previous/next page navigation.
                  /* the_posts_pagination( array(
                  'prev_text'          => __( 'Previous page', 'twentysixteen' ),
                  'next_text'          => __( 'Next page', 'twentysixteen' ),
                  'before_page_number' => '<span class="meta-nav screen-reader-text">' . __( 'Page', 'twentysixteen' ) . ' </span>',
                  ) );*/

                  // If no content, include the "No posts found" template.
                  else :
                     get_template_part( 'template-parts/content', 'none' );

                  endif;
                  ?>
               </div>

            </div>
         </div>

      </div>

   </div>
</div>
