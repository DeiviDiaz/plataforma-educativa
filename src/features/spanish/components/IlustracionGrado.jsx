const caminos = {
  1: 'M42 49 69 28 69 104',
  2: 'M37 48 C38 20 90 18 90 47 C90 66 60 80 39 102 H94',
  3: 'M38 35 C71 14 100 41 75 64 C106 73 94 112 43 105',
  4: 'M75 24 36 76 H98 M79 28 V106',
  5: 'M89 28 H43 L39 61 C73 46 99 66 90 89 C84 105 58 114 38 101',
};

const portadas = {
  6: { titulo: 'Relatos de tradición oral', lineas: ['Relatos de', 'tradición oral'], autor: 'Narración popular' },
  7: { titulo: 'Don Quijote', lineas: ['Don Quijote'], autor: 'Miguel de Cervantes' },
  8: { titulo: 'María', lineas: ['María'], autor: 'Jorge Isaacs' },
  9: { titulo: 'Cien años de soledad', lineas: ['Cien años', 'de soledad'], autor: 'Gabriel García Márquez' },
};

function PortadaLiteraria({ numero }) {
  const { titulo, lineas, autor } = portadas[numero];
  return (
    <div className="lengua-tarjeta-arte lengua-portada-literaria" role="img" aria-label={`Libro: ${titulo}, ${autor}`}>
      <svg viewBox="0 0 220 132" aria-hidden="true" focusable="false">
        <ellipse cx="111" cy="115" rx="77" ry="6" fill="currentColor" opacity=".15" />
        <path d="M54 90h114a4 4 0 0 1 4 4v13H56a8 8 0 0 1-2-17Z" fill="currentColor" opacity=".27" />
        <path d="M57 94h111v10H57a5 5 0 1 1 0-10Z" fill="#fff9ea" />
        <g transform="rotate(-9 110 67)">
          <rect x="65" y="17" width="99" height="94" rx="6" fill="currentColor" />
          <path d="M76 19v89" stroke="#f3d58a" opacity=".7" />
          <rect x="82" y="24" width="73" height="77" rx="2" fill="none" stroke="#f3d58a" opacity=".65" />
          <path d="M109 35h20m-15 4h10" stroke="#f3d58a" strokeLinecap="round" />
          <text x="118" y={lineas.length === 1 ? 63 : 54} textAnchor="middle" fill="#fff9ea" fontSize="12" fontFamily="Georgia, serif">
            {lineas.map((linea, index) => <tspan key={linea} x="118" dy={index ? 13 : 0}>{linea}</tspan>)}
          </text>
          <text x="118" y="86" textAnchor="middle" fill="#fff9ea" fontSize="6.7">{autor}</text>
        </g>
      </svg>
      <span aria-hidden="true" className="lengua-portada-grado">{numero}.º</span>
    </div>
  );
}

function Pollito() {
  return (
    <g transform="translate(143 69)">
      <path d="M10 33v9m16-9v9M5 42h9m7 0h10" fill="none" stroke="#9a4615" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="18" cy="25" rx="21" ry="15" fill="#ffcb53" />
      <circle cx="19" cy="10" r="16" fill="#ffde77" />
      <path d="m17-4-3-9 7 7 5-7-1 10" fill="#e98230" />
      <path d="m32 8 12 6-12 4" fill="#dd671d" />
      <path d="M10 25q7 9 15 1" fill="none" stroke="#e59629" strokeWidth="3" strokeLinecap="round" />
      <circle cx="26" cy="7" r="2.7" fill="#392818" />
      <circle cx="28" cy="16" r="3" fill="#f5a075" />
    </g>
  );
}

export default function IlustracionGrado({ numero, mascota }) {
  if (numero >= 6) return <PortadaLiteraria numero={numero} />;
  return (
    <div className="lengua-tarjeta-arte" aria-hidden="true">
      <svg viewBox="0 0 220 132" focusable="false">
        <ellipse cx="111" cy="114" rx="80" ry="7" fill="currentColor" opacity=".12" />
        <path d="M20 104q-7-12-1-17m1 17q6-15 14-14m159 11q-3-11-11-13m11 13q6-12 10-12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity=".35" />
        <circle cx="119" cy="27" r="4" fill="currentColor" opacity=".28" />
        <circle cx="178" cy="27" r="7" fill="none" stroke="currentColor" opacity=".28" strokeWidth="2" />

        <g>
            <path d={caminos[numero]} fill="none" stroke="currentColor" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round" />
            <path d={caminos[numero]} fill="none" stroke="var(--animal-body)" strokeWidth="19" strokeLinecap="round" strokeLinejoin="round" />
            {numero === 1 && (
              <g>
                <path d="M68 43h-7m8 13h-8m8 13h-8m8 13h-8m8 13h-8" stroke="#468044" strokeWidth="2.5" opacity=".75" strokeLinecap="round" />
                <circle cx="43" cy="48" r="12" fill="#b4e577" stroke="currentColor" strokeWidth="2" />
                <path d="M38 39l-3-7m10 6 3-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="39" cy="46" r="1.8" fill="#243f24" /><circle cx="47" cy="46" r="1.8" fill="#243f24" />
                <path d="M40 51q3 4 6 0" fill="none" stroke="#243f24" strokeWidth="1.5" />
              </g>
            )}
            {numero === 2 && (
              <g>
                <ellipse cx="40" cy="44" rx="15" ry="10" fill="#b4ed8c" stroke="currentColor" strokeWidth="2" />
                <circle cx="32" cy="36" r="6" fill="#b4ed8c" /><circle cx="48" cy="36" r="6" fill="#b4ed8c" />
                <circle cx="32" cy="36" r="2.5" fill="#214529" /><circle cx="48" cy="36" r="2.5" fill="#214529" />
                <path d="M33 45q7 7 14 0" fill="none" stroke="#214529" strokeWidth="1.6" strokeLinecap="round" />
                <path d="m86 104 6 7m-1-9 9 6m-5-9 8 1" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
              </g>
            )}
            {numero === 3 && (
              <path d="M52 106q-7 1-11-1" fill="none" stroke="#fff3df" strokeWidth="12" strokeLinecap="round" />
            )}
            {numero === 4 && (
              <g>
                <ellipse cx="76" cy="32" rx="15" ry="9" fill="#eed5f7" />
                <circle cx="71" cy="31" r="2.8" fill="#382243" /><circle cx="81" cy="31" r="2.8" fill="#382243" />
                <path d="m73 35 3 5 3-5" fill="#aa661c" />
              </g>
            )}
            {numero === 5 && (
              <path d="M40 35q-8-2-9 4m7 2q-8-1-9 5m7 2q-7 0-8 5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            )}
        </g>
        {numero === 1 ? <Pollito /> : <text x="154" y="96" textAnchor="middle" fontSize="48">{mascota}</text>}
      </svg>
    </div>
  );
}
