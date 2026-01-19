export const STORAGE_KEY = 'dompurify-visualizer-history';
export const DEFAULT_CONTENT = `<div class="content">
  <h1>Hello World</h1>
  <p onclick="alert('xss')">Try hovering me!</p>
  <script>alert('I will be removed');</script>
  <svg onload="alert(1)">
     <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
  </svg>
</div>`;
