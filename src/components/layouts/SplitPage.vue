<template>
  <div class="flex h-screen w-full">
    <div
      class="md:px-0 w-full md:w-5/12 flex items-center justify-center h-full md:bg-gradient-to-bl from-blue-500 to-blue-800 md:shadow z-10"
    >
      <div>
        <slot name="MainContent" />
      </div>
    </div>
    <div class="hidden md:block w-8 bg-gradient-to-bl from-blue-300 to-blue-400 h-full" />
    <div class="hidden md:block w-7/12 h-full">
      <slot name="SideContent" />
    </div>
  </div>
</template>
