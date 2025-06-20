<template>
  <div class="about-us">
    <section class="hero-section">
      <h1>About MovieScope</h1>
      <p class="subtitle">Where Faith Meets Technology in Cinema</p>
    </section>

    <section class="content-section">
      <div class="developer-profile">
        <h2>Meet the Developer</h2>
        <div class="profile-card">
          <div class="profile-header">
            <h3>Mbise</h3>
            <p class="title">Full Stack Developer & Computer Engineering Student</p>
          </div>
          
          <div class="profile-body">
            <div class="profile-section">
              <h4>Academic Background</h4>
              <p>
                Currently pursuing a Bachelor of Science in Computer Engineering at the 
                <strong>College of Informatics and Virtual Education (CIVE)</strong>, 
                <strong>University of Dodoma (UDOM)</strong>. My academic journey has equipped me with 
                strong fundamentals in software development, system architecture, and innovative 
                problem-solving techniques.
              </p>
            </div>

            <div class="profile-section">
              <h4>Spiritual Foundation</h4>
              <p>
                As a born-again Christian, my work ethic and creativity are deeply rooted in my faith. 
                I believe technology should serve humanity in ways that honor God. Every line of code 
                I write is guided by principles of integrity, excellence, and service to others.
              </p>
            </div>

            <div class="profile-section">
              <h4>Technical Expertise</h4>
              <p>
                Specializing in full-stack development with:
              </p>
              <ul>
                <li><strong>Frontend:</strong> Vue 3, Composition API, Pinia, Vite</li>
                <li><strong>Backend:</strong> Django, Django REST Framework</li>
                <li><strong>Database:</strong> PostgreSQL, SQLite</li>
                <li><strong>DevOps:</strong> Docker, CI/CD pipelines</li>
              </ul>
              <p>
                What began as a hobby has blossomed into a professional passion. I particularly enjoy 
                solving complex problems through elegant code architecture.
              </p>
            </div>

            <div class="profile-section">
              <h4>Personal Journey</h4>
              <p>
                As a Tanzanian developer in my mid-20s, I'm part of Africa's growing tech revolution. 
                My journey into programming started with simple scripts and has grown to encompass 
                complete web applications like MovieScope. I'm particularly interested in how technology 
                can bridge gaps in education and entertainment across developing nations.
              </p>
              <p>
                When not coding, you'll find me contributing to open-source projects, mentoring 
                junior developers, or studying new frameworks to expand my skill set.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="project-vision">
        <h2>About MovieScope</h2>
        <p>
          MovieScope was born from my dual passions for cinema and web development. This project represents:
        </p>
        <ul>
          <li>A demonstration of modern Vue 3 capabilities</li>
          <li>An exploration of TMDB API integration</li>
          <li>A commitment to clean, maintainable code</li>
          <li>A platform for discovering quality entertainment</li>
        </ul>
        <p>
          The application showcases my ability to create responsive, user-friendly interfaces while 
          implementing complex features like streaming integration and dynamic routing.
        </p>

        <div class="tech-stack">
          <h3>Technical Implementation</h3>
          <div class="stack-grid">
            <div class="stack-card">
              <h4>Frontend</h4>
              <ul>
                <li>Vue 3 Composition API</li>
                <li>Vite Build Tool</li>
                <li>Axios for HTTP requests</li>
                <li>Vue Router</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
            <div class="stack-card">
              <h4>Backend</h4>
              <ul>
                <li>Django REST Framework</li>
                <li>JWT Authentication</li>
                <li>PostgreSQL Database</li>
                <li>Redis Caching</li>
              </ul>
            </div>
            <div class="stack-card">
              <h4>Services</h4>
              <ul>
                <li>TMDB API Integration</li>
                <li>VidSrc Streaming</li>
                <li>Cloudinary Image Hosting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="mission-statement">
        <h2>My Development Philosophy</h2>
        <blockquote>
          "Code should not just work - it should inspire, serve, and reflect godly principles 
          of excellence and stewardship."
        </blockquote>
        <p>
          I believe in creating applications that are:
        </p>
        <ul>
          <li><strong>User-Centric:</strong> Intuitive interfaces that solve real problems</li>
          <li><strong>Performant:</strong> Optimized for speed and efficiency</li>
          <li><strong>Maintainable:</strong> Clean, well-documented code</li>
          <li><strong>Ethical:</strong> Respecting user privacy and content rights</li>
        </ul>
      </div>
    </section>

    <section class="contact-cta">
      <h2>Get In Touch</h2>
      <p>
        Interested in collaborating or have questions about MovieScope?
      </p>
      <button class="contact-btn">Contact Developer</button>
    </section>
  </div>
</template>

<script setup>
// Any necessary imports or reactive data
</script>

<style scoped>
.about-us {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #333;
  line-height: 1.6;
}

.hero-section {
  text-align: center;
  padding: 3rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 10px;
  margin-bottom: 2rem;
}

.hero-section h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #555;
}

.content-section {
  display: grid;
  gap: 3rem;
}

.profile-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.profile-header {
  background: #2c3e50;
  color: white;
  padding: 1.5rem;
}

.profile-header h3 {
  font-size: 1.8rem;
  margin: 0;
}

.title {
  margin: 0.5rem 0 0;
  opacity: 0.9;
}

.profile-body {
  padding: 2rem;
}

.profile-section {
  margin-bottom: 2rem;
}

.profile-section h4 {
  color: #2c3e50;
  border-bottom: 2px solid #eee;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.tech-stack {
  margin-top: 2rem;
}

.stack-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.stack-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #42b983;
}

.stack-card h4 {
  margin-top: 0;
  color: #2c3e50;
}

.mission-statement {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  margin-top: 2rem;
}

blockquote {
  font-style: italic;
  border-left: 4px solid #42b983;
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: #555;
}

.contact-cta {
  text-align: center;
  margin-top: 3rem;
  padding: 2rem;
  background: #2c3e50;
  color: white;
  border-radius: 10px;
}

.contact-btn {
  background: #42b983;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.3s;
}

.contact-btn:hover {
  background: #3aa876;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 2rem 1rem;
  }
  
  .profile-body {
    padding: 1.5rem;
  }
  
  .stack-grid {
    grid-template-columns: 1fr;
  }
}
</style>