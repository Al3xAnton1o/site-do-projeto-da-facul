"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrar, setMostrar] = useState(false);
  const [lembrar, setLembrar] = useState(false);
  const [erros, setErros] = useState({});
  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  // Recupera o e-mail salvo, se existir
  useEffect(() => {
    try {
      const salvo = localStorage.getItem("login_email");
      if (salvo) {
        setEmail(salvo);
        setLembrar(true);
      }
    } catch {}
  }, []);

  function validar() {
    const e = {};
    if (!email.trim()) e.email = "Digite seu e-mail.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      e.email = "Esse e-mail parece incompleto. Exemplo: nome@email.com";
    if (!senha) e.senha = "Digite sua senha.";
    else if (senha.length < 6) e.senha = "A senha precisa ter pelo menos 6 caracteres.";
    setErros(e);
    return Object.keys(e).length === 0;
  }

  async function enviar(ev) {
    ev.preventDefault();
    setSucesso(false);
    if (!validar()) return;

    try {
      if (lembrar) localStorage.setItem("login_email", email.trim());
      else localStorage.removeItem("login_email");
    } catch {}

    setCarregando(true);
    // Simulação: troque pelo fetch para a sua API (ex.: /api/login)
    await new Promise((r) => setTimeout(r, 1200));
    setCarregando(false);
    setSucesso(true);
    // router.push("/cursos") quando a página de cursos existir
  }

  return (
    <>
      <section className="art" aria-label="Ilustração de estudos">
        <div className="frame">
          <Image
            src="/estudos.jpg"
            alt="Duas pessoas estudando com notebooks sentadas sobre uma pilha de livros"
            width={1000}
            height={523}
            priority
          />
        </div>
        <h2>Estudar fica mais fácil quando você começa</h2>
        <p>Acesse suas aulas, materiais e anotações em um só lugar.</p>
      </section>

      <main className="side">
        <div className="box">
          <h1>Bem-vindo de volta</h1>
          <p className="sub">Entre para continuar seus estudos.</p>

          <form onSubmit={enviar} noValidate>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="voce@email.com"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!erros.email}
            />
            <p className="err" role="alert">{erros.email}</p>

            <label htmlFor="senha">Senha</label>
            <div className="field">
              <input
                id="senha"
                type={mostrar ? "text" : "password"}
                placeholder="Sua senha"
                autoComplete="current-password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                aria-invalid={!!erros.senha}
              />
              <button
                type="button"
                className="eye"
                onClick={() => setMostrar(!mostrar)}
                aria-label={mostrar ? "Ocultar senha" : "Mostrar senha"}
              >
                {mostrar ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            <p className="err" role="alert">{erros.senha}</p>

            <div className="row">
              <label>
                <input
                  type="checkbox"
                  checked={lembrar}
                  onChange={(e) => setLembrar(e.target.checked)}
                />
                Lembrar de mim
              </label>
              <a href="#">Esqueci a senha</a>
            </div>

            <button className="btn" type="submit" disabled={carregando}>
              {carregando ? "Entrando..." : "Entrar"}
            </button>
            <p className={"status" + (sucesso ? " ok" : "")} aria-live="polite">
              {sucesso ? "Login realizado com sucesso!" : ""}
            </p>
          </form>

          <p className="foot">
            Ainda não tem conta? <a href="#">Criar conta</a>
          </p>
        </div>
      </main>
    </>
  );
}
