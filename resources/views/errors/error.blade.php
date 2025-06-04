<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>{{ $code ?? 'Error' }} - TaniCerdas</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Import Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Livvic:wght@700&family=Poppins:wght@400;700&display=swap" rel="stylesheet">
    <style>
        html, body {
            width: 100vw;
            height: 100vh;
            min-height: 100vh;
            margin: 0;
            padding: 0;
            background: #325700;
            font-family: 'Poppins', Arial, sans-serif;
        }
        body {
            overflow: hidden;
        }
        .error-container {
            position: fixed;
            inset: 0;
            width: 100vw;
            height: 100vh;
            background: #325700;
            border-radius: 0;
            box-shadow: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            animation: fade-in-down 0.5s ease-out;
        }
        .error-img {
            width: 150px;
            height: 150px;
            animation: bounce-slow 2s infinite;
        }
        .error-code {
            font-size: 3.5rem;
            font-family: 'Livvic', Arial, sans-serif;
            font-weight: bold;
            color: #FFFA72;
            margin-bottom: 0.5rem;
            line-height: 1;
        }
        .error-title {
            font-size: 1.3rem;
            font-family: 'Livvic', Arial, sans-serif;
            font-weight: bold;
            color: white;
            margin-bottom: 1rem;
        }
        .error-desc {
            color: white;
            font-size: 1rem;
            margin-bottom: 1.5rem;
        }
        .error-btn {
            display: inline-block;
            background: #FFFA72;
            color: #2E4D1C;
            font-family: 'Livvic', Arial, sans-serif;
            font-weight: bold;
            padding: 0.75rem 2.5rem;
            border-radius: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            text-decoration: none;
            font-size: 1rem;
            margin-bottom: 1.5rem;
            transition: background 0.2s, transform 0.2s;
        }
        .error-btn:hover {
            background: #fff36b;
            transform: scale(1.05);
        }
        .error-help {
            margin-top: 0.5rem;
            font-size: 0.95rem;
            color: #FFA800;
        }
        .error-help a {
            color: white;
            text-decoration: underline;
            transition: color 0.2s;
        }
        .error-help a:hover {
            color: #FFA800;
        }
        .error-footer {
            margin-top: 2.5rem;
            color: #fff;
            font-size: 0.85rem;
            text-align: center;
            opacity: 0.7;
        }
        @keyframes fade-in-down {
            0% { opacity: 0; transform: translateY(-20px);}
            100% { opacity: 1; transform: translateY(0);}
        }
        @keyframes bounce-slow {
            0%,100% { transform: translateY(0);}
            50% { transform: translateY(-10px);}
        }
        @media (max-width: 500px) {
            .error-container { padding: 1.5rem 0.5rem; }
            .error-code { font-size: 2.2rem; }
            .error-title { font-size: 1rem; }
        }
    </style>
</head>
<body>
    <div class="error-container">
        <div class="flex flex-col items-center mb-2">
            <!-- <img src="/images/error.png" alt="Error" class="error-img" /> -->
            <h1 class="error-code">{{ $code ?? 'Error' }}</h1>
            <h2 class="error-title">{{ $message ?? 'Oops! Terjadi kesalahan tak terduga.' }}</h2>
        </div>
        <p class="error-desc">
            Maaf, kami tidak dapat memproses permintaan Anda.<br>
            Pastikan URL benar atau hubungi tim kami jika masalah tetap terjadi.
        </p>
        <a href="/" class="error-btn">
            Kembali ke Beranda
        </a>
        <div class="error-help">
            Butuh bantuan? Hubungi
            <a href="mailto:needhelp@company.com">TaniCerdas@company.com</a>
        </div>
    </div>
</body>
</html>
