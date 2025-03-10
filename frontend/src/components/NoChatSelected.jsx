import React, {useEffect, useRef} from 'react'

const NoChatSelected = () => {


    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Устанавливаем размеры canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Массив частиц
        const particles = [];
        const particleCount = 250;

        // Класс для частиц
        class Particle {
            constructor(x, y, radius, speedX, speedY, color) {
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.speedX = speedX;
                this.speedY = speedY;
                this.color = color;
            }

            // Рисуем частицу
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.closePath();
            }

            // Обновляем позицию частицы
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Отражение от краев экрана
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

                this.draw();
            }
        }

        // Инициализация частиц
        for (let i = 0; i < particleCount; i++) {
            const radius = Math.random() * 3 + 2; // Радиус частицы (2–5px)
            const x = Math.random() * canvas.width; // Начальная позиция X
            const y = Math.random() * canvas.height; // Начальная позиция Y
            const speedX = (Math.random() - 0.5) * 2; // Скорость по X
            const speedY = (Math.random() - 0.5) * 2; // Скорость по Y
            const color = `lightblue`; // Случайный цвет

            particles.push(new Particle(x, y, radius, speedX, speedY, color));
        }

        // Анимация
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем canvas
            particles.forEach((particle) => particle.update()); // Обновляем каждую частицу
            requestAnimationFrame(animate); // Рекурсивно вызываем анимацию
        };

        animate();

        // Обновление размера canvas при изменении размера окна
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        // Удаляем обработчик событий при размонтировании
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <div className='relative'>
            <canvas className='hidden sm:block' ref={canvasRef}/>
            <div className='absolute top-0 z-20 hidden sm:left-[5%]  sm:block sm:left-[2%] sm:right-[22%] sm:text-left md:left-[-11%] md:text-center
              top-[40%]'>
                <h1 className=' sm:text-xl md:text-2xl lg:text-3xl text-blue-500 font-extrabold '>Начните общаться прямо сейчас!</h1>
                <p className='text-sm mt-4 text-gray-500'>Выберите любой чат чтобы продолжить</p>
            </div>
        </div>
    )
}
export default NoChatSelected
