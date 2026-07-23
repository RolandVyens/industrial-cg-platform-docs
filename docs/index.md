---
layout: false
description: "if (typeof window !== 'undefined') {"
---
<script>
if (typeof window !== 'undefined') {
  const base = window.location.pathname.endsWith('/') ? window.location.pathname : window.location.pathname + '/';
  window.location.replace(base + 'en/');
}
</script>
