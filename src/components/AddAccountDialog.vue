<template>
  <div class="flex flex-col relative">
    <header class="dlg-header">
      <slot name="header">Header goes here ...</slot>
    </header>
    <section class="modal-body" id="modal-body">
      <slot name="body">Body goes here ...</slot>
    </section>

    <footer class="modal-footer">
      <slot name="footer">Footer goes here ...</slot>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.dlg-header {
  position: absolute;
  top: 0px;
  left: 0px;
  background: blue;
  width: 100%;
  display: block;
  color: white;
  height: 2rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  line-height: 2rem;
  text-align: left;
  padding-left: 10px;
}
</style>
