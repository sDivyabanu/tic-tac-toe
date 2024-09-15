import { useEffect } from "react";

const CanvasBackground = () => {
  useEffect(() => {
    const maxx = window.innerWidth;
    const maxy = window.innerHeight;
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed"; // Ensure it stays fixed in the background
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw"; // Use viewport width
    canvas.style.height = "100vh"; // Use viewport height
    canvas.style.zIndex = "-1"; // Send the canvas to the back
    canvas.style.pointerEvents = "none"; // Prevent the canvas from intercepting any clicks
    document.body.appendChild(canvas);

    canvas.width = maxx;
    canvas.height = maxy;
    const context = canvas.getContext("2d");
    const dotCount = 200;
    const dots = [];

    // create dots
    for (let i = 0; i < dotCount; i++) {
      dots.push(new Dot());
    }

    // dots animation
    function render() {
      context.fillStyle = "#000000";
      context.fillRect(0, 0, maxx, maxy);
      for (let i = 0; i < dotCount; i++) {
        dots[i].draw();
        dots[i].move();
      }
      requestAnimationFrame(render);
    }

    // dots class
    function Dot() {
      this.rad_x = 2 * Math.random() * maxx + 1;
      this.rad_y = 1.2 * Math.random() * maxy + 1;
      this.alpha = Math.random() * 360 + 1;
      this.speed = Math.random() * 100 < 50 ? 1 : -1;
      this.speed *= 0.1;
      this.size = Math.random() * 5 + 1;
      this.color = Math.floor(Math.random() * 256);
    }

    // drawing dot
    Dot.prototype.draw = function () {
      const dx = maxx / 2 + this.rad_x * Math.cos(this.alpha / 180 * Math.PI);
      const dy = maxy / 2 + this.rad_y * Math.sin(this.alpha / 180 * Math.PI);
      context.fillStyle = `rgb(${this.color}, ${this.color}, ${this.color})`;
      context.fillRect(dx, dy, this.size, this.size);
    };

    // calc new position in polar coord
    Dot.prototype.move = function () {
      this.alpha += this.speed;
      if (Math.random() * 100 < 50) {
        this.color += 1;
      } else {
        this.color -= 1;
      }
    };

    render();

    // Clean up on component unmount
    return () => {
      document.body.removeChild(canvas);
    };
  }, []);

  return null; // No JSX return since this component doesn't render any visible element
};

export default CanvasBackground;
