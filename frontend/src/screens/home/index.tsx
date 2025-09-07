import { ColorSwatch, Group } from '@mantine/core';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import { SWATCHES } from '@/constants';

interface GeneratedResult {
    expression: string;
    answer: string;
}

interface Response {
    expr: string;
    result: string;
    assign: boolean;
}

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('rgb(255, 255, 255)');
    const [reset, setReset] = useState(false);
    const [dictOfVars, setDictOfVars] = useState({});
    const [result, setResult] = useState<GeneratedResult>();
    const [latexPosition, setLatexPosition] = useState({ x: 10, y: 200 });
    const [latexExpression, setLatexExpression] = useState<Array<string>>([]);
<<<<<<< HEAD
=======
    const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);
>>>>>>> 44963550beaf6bc1e5082599960ec462d6ac7308

    useEffect(() => {
        if (latexExpression.length > 0 && window.MathJax) {
            setTimeout(() => {
                window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
            }, 0);
        }
    }, [latexExpression]);

    useEffect(() => {
        if (reset) {
            resetCanvas();
            setLatexExpression([]);
            setResult(undefined);
            setDictOfVars({});
            setReset(false);
        }
    }, [reset]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight - canvas.offsetTop;
                ctx.lineCap = 'round';
                ctx.lineWidth = 3;
            }
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML';
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.MathJax.Hub.Config({
<<<<<<< HEAD
                tex2jax: { inlineMath: [['$', '$'], ['\\(', '\\)']] },
=======
                tex2jax: { inlineMath: [['$', '$'], ['\', '\']] },
>>>>>>> 44963550beaf6bc1e5082599960ec462d6ac7308
            });
        };

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const renderLatexToCanvas = useCallback((expression: string, answer: string) => {
<<<<<<< HEAD
        const latex = `\\(\\LARGE{${expression} = ${answer}}\\)`;
=======
        const latex = `\\\LARGE{${expression} = ${answer}}\`;
>>>>>>> 44963550beaf6bc1e5082599960ec462d6ac7308
        setLatexExpression((prev) => [...prev, latex]);

        // Clear the main canvas
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    }, []);

    useEffect(() => {
        if (result) {
            renderLatexToCanvas(result.expression, result.answer);
        }
    }, [result, renderLatexToCanvas]);

    const resetCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    };

<<<<<<< HEAD
    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.style.background = 'black';
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.beginPath();
                ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                setIsDrawing(true);
            }
        }
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.strokeStyle = color;
                ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                ctx.stroke();
            }
        }
=======
    const startDrawing = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
        const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
        setLastPoint({ x, y });
    };

    const draw = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
        const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

        if (lastPoint) {
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';

            // Bézier Curve for Smoothness
            ctx.beginPath();
            ctx.moveTo(lastPoint.x, lastPoint.y);
            ctx.quadraticCurveTo(
                (lastPoint.x + x) / 2,
                (lastPoint.y + y) / 2,
                x,
                y
            );
            ctx.stroke();
        }

        setLastPoint({ x, y });
>>>>>>> 44963550beaf6bc1e5082599960ec462d6ac7308
    };

    const stopDrawing = () => {
        setIsDrawing(false);
<<<<<<< HEAD
=======
        setLastPoint(null);
>>>>>>> 44963550beaf6bc1e5082599960ec462d6ac7308
    };

    const runRoute = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/calculate`, {
            image: canvas.toDataURL('image/png'),
            dict_of_vars: dictOfVars
        });

        const resp = await response.data;
        console.log('Response', resp);

        resp.data.forEach((data: Response) => {
            if (data.assign) {
                setDictOfVars((prevVars) => ({
                    ...prevVars,
                    [data.expr]: data.result
                }));
            }
        });

        const ctx = canvas.getContext('2d');
        const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
        let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;

        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                const i = (y * canvas.width + x) * 4;
<<<<<<< HEAD
                if (imageData.data[i + 3] > 0) { // If pixel is not transparent
=======
                if (imageData.data[i + 3] > 0) {
>>>>>>> 44963550beaf6bc1e5082599960ec462d6ac7308
                    minX = Math.min(minX, x);
                    minY = Math.min(minY, y);
                    maxX = Math.max(maxX, x);
                    maxY = Math.max(maxY, y);
                }
            }
        }

        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;
        setLatexPosition({ x: centerX, y: centerY });

        resp.data.forEach((data: Response) => {
            setTimeout(() => {
                setResult({ expression: data.expr, answer: data.result });
            }, 1000);
        });
    };

    return (
        <>
            <div className='grid grid-cols-3 gap-2'>
                <Button onClick={() => setReset(true)} className='z-20 bg-black text-white'>
                    Reset
                </Button>
                <Group className='z-20'>
                    {SWATCHES.map((swatch) => (
                        <ColorSwatch key={swatch} color={swatch} onClick={() => setColor(swatch)} />
                    ))}
                </Group>
                <Button onClick={runRoute} className='z-20 bg-black text-white'>
                    Run
                </Button>
            </div>

            <canvas
                ref={canvasRef}
                className='absolute top-0 left-0 w-full h-full'
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
<<<<<<< HEAD
            />

            {latexExpression.map((latex, index) => (
                <Draggable
                    key={index}
                    defaultPosition={latexPosition}
                    onStop={(e, data) => setLatexPosition({ x: data.x, y: data.y })}
                >
                    <div className="absolute p-2 text-white rounded shadow-md">
                        <div className="latex-content">{latex}</div>
                    </div>
                </Draggable>
            ))}
=======
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
            />
>>>>>>> 44963550beaf6bc1e5082599960ec462d6ac7308
        </>
    );
}
