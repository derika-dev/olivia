import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Optional: log error ke server
    // console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#2B4F00] text-white">
          <h1 className="text-4xl font-bold mb-4">Terjadi Kesalahan</h1>
          <p className="mb-6">Maaf, terjadi kesalahan pada aplikasi.</p>
          <button
            className="bg-[#FDF76D] text-[#2B4F00] px-6 py-2 rounded font-bold"
            onClick={() => window.location.reload()}
          >
            Muat Ulang Halaman
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}