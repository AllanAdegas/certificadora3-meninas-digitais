/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase/client";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const SobrePage = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
        if (!currentUser) {
          router.push("/login");
        } else {
          setUser(currentUser);
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserName(userData.name || "No Name");
          } else {
            setUserName("No Name");
          }
        }
      });
  
      return () => unsubscribe();
    }, [router]);


  return (
    <div className="px-6 py-12 bg-white min-h-screen font-sans">
      <div className="max-w-4xl mx-auto shadow-2xl rounded-lg overflow-hidden bg-white">
        <div className="bg-[#772b8c] p-4">
            <h1 className="text-4xl font-bold text-center text-white">Sobre o Projeto</h1>
        </div>
        
        <section className="mb-12 px-8 py-6">
          <h2 className="text-3xl font-bold text-[#c67f23] mb-4">Objetivos</h2>
          <p className="text-black leading-8 text-justify">
            O projeto tem como objetivo principal incentivar e auxiliar meninas estudantes do ensino fundamental e médio de Cornélio Procópio a seguirem carreiras nas áreas de ciência, tecnologia, engenharia e matemática (STEM).
          </p>
          <p className="text-black leading-8 text-justify mt-4">
            O projeto enfatiza a importância de meninas e mulheres nas áreas de computação, demonstrando como elas podem causar um impacto positivo na sociedade. Ao promover a igualdade de gênero nessas áreas, espera-se contribuir para a redução da desigualdade e para a criação de um ambiente mais igualitário, diverso e inclusivo.
          </p>
        </section>

        <section className="mb-12 px-8 py-6 bg-gray-200 flex flex-wrap items-center">
          <div className="w-full md:w-1/2 mb-6 md:mb-0 md:pr-6">
            <h2 className="text-3xl font-bold text-[#c67f23] mb-4">Quem Somos Nós</h2>
            <p className="text-black leading-8 text-justify">
              O grupo é composto por estudantes da UTFPR de Cornélio Procópio. Juntamente com a professora Rosangela Marquesone, visamos fazer a diferença na sociedade por meio da educação.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img src="/equipe.png" alt="Meninas Digitais Group Photo" className="rounded-lg shadow-lg max-w-full" />
          </div>
        </section>

        <section className="mb-12 px-8 py-6">
          <h2 className="text-3xl font-bold text-[#c67f23] mb-4">Missão</h2>
          <p className="text-black leading-8 text-justify">
            Apoiar meninas de escolas públicas na escolha acadêmica e profissional para a área da tecnologia/computação através de ações educacionais que proporcionam interesse sobre o assunto.
          </p>
        </section>

        <section className="mb-12 px-8 py-6 bg-gray-200">
          <h2 className="text-3xl font-bold text-[#c67f23] mb-4">Visão</h2>
          <p className="text-black leading-8 text-justify">
            Empoderar meninas através da tecnologia. Buscamos ser reconhecidas como um meio de difusão e apoio para meninas e jovens garotas interessadas em tecnologia. Com uma sólida rede de apoio construída na UTFPR-CP, estamos comprometidas em capacitar e inspirar essa nova geração a se tornar líderes no campo da tecnologia.
          </p>
        </section>

        <section className="mb-12 px-8 py-6">
          <h2 className="text-3xl font-bold text-[#c67f23] mb-4">Projetos</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-black leading-8">
            <li className="text-center mb-4">{/* Added margin bottom */}
              <strong>Meninas no Lab</strong> 
              <p>
                Oficina e mentoria ministrada por estudantes e/ou professores da UTFPR-CP sobre um tema de computação e/ou STEM para meninas estudantes de ensino fundamental e médio.
              </p>
            </li>
            <li className="text-center mb-4">{/* Added margin bottom */}
              <strong>Rodas de Conversa</strong> 
              <p>
                Rodas de conversa entre estudantes/ou professores da UTFPR-CP e estudantes do ensino fundamental e médio, possibilitando o relato de experiências na universidade e resolução de dúvidas.
              </p>
            </li>
            <li className="text-center">{/* Added margin bottom */}
              <strong>Minicurso</strong> 
              <p>
                Minicurso sobre sustentabilidade e sua relação com computação e STEM, com foco em demonstrar exemplos de como as meninas e mulheres podem se capacitar em tais áreas para causar impactos positivos na sociedade.
              </p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default SobrePage;