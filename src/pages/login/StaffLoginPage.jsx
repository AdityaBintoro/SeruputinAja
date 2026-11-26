import { useState } from 'react'
import { useNavigate } from 'react-router'

function LoginPage({ onLoginSuccess }) {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()

        const trimmedUser = username.trim()
        const trimmedPass = password.trim()

        if (!trimmedUser || !trimmedPass) {
            setErrorMessage('Username dan password wajib diisi.')
            return
        }

        setErrorMessage('')

        const sessionData = {
            username: trimmedUser,
            loggedInAt: new Date().toISOString(),
        }

        // Jika onLoginSuccess mengembalikan data user dengan role (misal dari backend),
        // arahkan sesuai rolenya; jika belum ada, default ke '/kasir'
        const authResult =
            typeof onLoginSuccess === 'function' ? onLoginSuccess(sessionData) : null

        const targetRoute = authResult?.role === 'admin' ? '/admin' : '/kasir'
        navigate(targetRoute, { replace: true })
    }

    return (
        <main className="flex min-h-[calc(100vh-10rem)] items-center justify-center bg-[#f5efe6] px-6 py-12 text-[#39291f]">
            <section className="w-full max-w-md rounded-2xl border border-[#39291f]/12 bg-[#f6efe4] p-7 shadow-sm md:p-8">
                <div className="mb-6">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#665547] transition-colors hover:text-tan"
                    >
                        <span>←</span>
                        <span>Kembali ke Menu Utama</span>
                    </button>

                    <p className="text-xs font-semibold uppercase tracking-wider text-tan">
                        Portal Internal SeruputinAja
                    </p>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
                        Masuk Staf
                    </h1>
                    <p className="mt-1.5 text-sm text-[#665547]">
                        Masukkan username dan password untuk membuka panel kasir atau admin.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div>
                        <label
                            htmlFor="staff-username"
                            className="block text-sm font-medium text-[#39291f]"
                        >
                            Username
                        </label>
                        <input
                            id="staff-username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Masukkan username staf"
                            className="mt-1.5 w-full rounded-lg border border-[#39291f]/20 bg-white px-4 py-2.5 text-sm text-[#39291f] placeholder-[#665547]/50 outline-none transition-colors focus:border-tan"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="staff-password"
                                className="block text-sm font-medium text-[#39291f]"
                            >
                                Password
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="text-xs font-medium text-tan hover:underline"
                            >
                                {showPassword ? 'Sembunyikan' : 'Tampilkan'}
                            </button>
                        </div>

                        <input
                            id="staff-password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Masukkan password"
                            className="mt-1.5 w-full rounded-lg border border-[#39291f]/20 bg-white px-4 py-2.5 text-sm text-[#39291f] placeholder-[#665547]/50 outline-none transition-colors focus:border-tan"
                        />
                    </div>

                    {errorMessage && (
                        <div
                            role="alert"
                            className="rounded-lg border border-red-300 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-800"
                        >
                            {errorMessage}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-tan px-5 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:brightness-110 active:scale-[0.99]"
                    >
                        Masuk
                    </button>
                </form>
            </section>
        </main>
    )
}

export default LoginPage