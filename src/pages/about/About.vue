<template>
  <section class="about_container">
  <div class="about_block">
    <h1 class="about_h1">Sobre Mí</h1>
    <p class="about_paragraph">
      Soy un desarrollador Front-End con más de 10 años de experiencia
      construyendo productos digitales de alto tráfico. Especializado en React,
      TypeScript y arquitecturas orientadas a performance y experiencia de
      usuario. Perfil híbrido con capacidad para traducir requerimientos de
      negocio en soluciones técnicas sólidas, con foco en métricas, calidad de
      código y mejora continua.
    </p>
  </div>

  <div class="about_block">
    <h2 class="about_h2">Sobre Próxima</h2>
    <p class="about_paragraph">
      Próxima es un proyecto Front-End (Blog), que busca explorar y refrescar
      conocimientos en Vuw, typescript, css, etc. está conectado al proyecto
      backend llamado
      <a
        class="about_link"
        href="https://github.com/rlopezse/horizon/"
        target="_blank"
        >Horizon</a
      >, el cual es un proyecto de NodeJS, Express y MongoDB. Ambos proyectos se
      encuentran en desarrollo, por lo que se irán actualizando con nuevas
      funcionalidades y mejoras.
    </p>
  </div>
  </section>
</template>

<style scoped>
.about_container {
  margin-top: calc(16px * 4);
}

.about_paragraph {
  color: var(--gray-600);
}

.about_block {
  padding-bottom: calc(16px * 2);
}

.about_h1 {
  font-size: calc(16px * 3);
  color: var(--black);
  margin-bottom: 16px;
  font-family: 'Ultra';
}

.about_h2 {
  font-size: calc(16px * 2);
  font-family: 'Ultra';
  color: var(--black);
  margin-bottom: 16px;
}

.about_link {
  color: var(--primary);
}
</style>
