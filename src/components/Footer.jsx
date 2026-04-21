function Footer() {
    return (
        <footer className="bg-gray-900 border-t border-gray-700 text-gray-400 text-center py-6 px-4 w-full mt-auto">
            <div className="max-w-5xl mx-auto flex flex-col items-center gap-2">
                <p className="font-semibold text-gray-300">
                    © 2026 - Nodo Tecnológico de Catamarca
                </p>
                <p className="text-sm">
                    Diplomatura Full Stack - Módulo 4 - TP4 by <span className="text-green-400 font-bold">Cristian Godoy</span>
                </p>
                
                {/* Separador sutil */}
                <span className="w-16 h-px bg-gray-600 my-2"></span>

                <p className="text-xs italic text-gray-400">
                    Proyecto realizado íntegramente con <span className="text-white font-medium">GitHub Copilot</span>, utilizando el modelo <span className="text-blue-400 font-medium">Gemini 3.1 Pro (Preview)</span>.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
