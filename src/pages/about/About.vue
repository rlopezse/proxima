<template>
  <section class="about_container">
    <ul class="about_block">
      <li><a href="https://www.linkedin.com/in/rlopezse/" target="_blank" class="about_link"> - Sobre mí (Profesionalmente)</a></li>
      <li><a href="https://github.com/rlopezse" target="_blank" class="about_link"> - Mis proyectos personales</a></li>
    </ul>
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

.about_link:hover {
  text-decoration: underline;
}
</style>
