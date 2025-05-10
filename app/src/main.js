import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
// style
import "./css/components/block/buttons/button.css";
import "./css/components/block/buttons/chapter.css";
import "./css/components/block/icons/icon.css";
import "./css/components/block/inputs/input.css";
import "./css/components/block/other/other.css";
import "./css/components/variables/text-style.css";
import "./css/components/variables/variables.css";

const app = createApp(App);
app.use(autoAnimatePlugin);
app.use(router); // Используем router
app.mount("#app"); // Монтируем приложение
