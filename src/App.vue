<template>
  <div class="root">
    <div class="root-main">
      <router-view></router-view>
    </div>
    <div class="tabbar" v-if="haveTabbar">
      <Tabbar />
    </div>
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar'
import { mapState } from 'vuex'
export default {
  name: 'App',
  components: {
    Tabbar
  },
  computed: {
    ...mapState(['haveTabbar'])
  }
}
</script>

<style lang="scss">
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

html,
body,
.root{
  width: 100%;
  height: 100%;
}
.root {
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  &-main{
    flex: 1;
    overflow-x: hidden;
  }
  &-header {
    height: 60px;
    background: #ff0;
  }
  &.tabbar {
    height: 60px;
  }
}
</style>
