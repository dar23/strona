(() => {
  const LANGS = ['pl', 'en', 'es', 'de'];
  const STORAGE_KEY = 'jr-lang';

  // Każdy wiersz: [polski (klucz), angielski, hiszpański, niemiecki]
  const rows = [
    ['Just Rigging — omasztowanie, takielunek, osprzęt jachtowy i zarządzanie projektami żaglowymi.', 'Just Rigging — masts, rigging, yacht hardware and sailing project management.', 'Just Rigging — mástiles, jarcia, herrajes náuticos y gestión de proyectos de vela.', 'Just Rigging — Masten, Rigg, Yachtbeschläge und Projektmanagement für Segelyachten.'],
    ['Maszty i takielunek — Just Rigging', 'Masts and rigging — Just Rigging', 'Mástiles y jarcia — Just Rigging', 'Masten und Rigg — Just Rigging'],
    ['Okucia i osprzęt — Just Rigging', 'Fittings and hardware — Just Rigging', 'Herrajes y accesorios — Just Rigging', 'Beschläge und Zubehör — Just Rigging'],
    ['Architektoniczne systemy cięgnowe — Just Rigging', 'Architectural tensile systems — Just Rigging', 'Sistemas de cables arquitectónicos — Just Rigging', 'Architektonische Seilsysteme — Just Rigging'],
    ['Zarządzanie projektami — Just Rigging', 'Project management — Just Rigging', 'Gestión de proyectos — Just Rigging', 'Projektmanagement — Just Rigging'],

    ['Nawigacja główna', 'Main navigation', 'Navegación principal', 'Hauptnavigation'],
    ['Just Rigging — strona główna', 'Just Rigging — home page', 'Just Rigging — página principal', 'Just Rigging — Startseite'],
    ['Otwórz menu', 'Open menu', 'Abrir menú', 'Menü öffnen'],
    ['Zamknij menu', 'Close menu', 'Cerrar menú', 'Menü schließen'],
    ['Język', 'Language', 'Idioma', 'Sprache'],
    ['Misja', 'Mission', 'Misión', 'Mission'],
    ['Czym się zajmujemy', 'What we do', 'Qué hacemos', 'Was wir tun'],
    ['Oferta', 'Offer', 'Oferta', 'Angebot'],
    ['Współpraca', 'Cooperation', 'Colaboración', 'Zusammenarbeit'],
    ['Zespół', 'Team', 'Equipo', 'Team'],
    ['Kontakt', 'Contact', 'Contacto', 'Kontakt'],
    ['Partnerzy technologiczni', 'Technology partners', 'Socios tecnológicos', 'Technologiepartner'],
    ['Logotypy partnerów', 'Partner logos', 'Logotipos de socios', 'Partnerlogos'],

    ['01 / Nasza misja', '01 / Our mission', '01 / Nuestra misión', '01 / Unsere Mission'],
    ['Wiedza, która buduje', 'Knowledge that builds', 'Conocimiento que genera', 'Wissen, das Sicherheit'],
    ['pewność na wodzie.', 'confidence on the water.', 'confianza en el agua.', 'auf dem Wasser schafft.'],
    ['Żeglarz przy maszcie jachtu żaglowego', 'Sailor at the mast of a sailing yacht', 'Marinero junto al mástil de un velero', 'Segler am Mast einer Segelyacht'],
    ['Każdy detal ma znaczenie', 'Every detail matters', 'Cada detalle importa', 'Jedes Detail zählt'],
    ['Just Rigging to owoc wieloletniej pasji żeglarstwa, doświadczenia i profesjonalizmu nieuznającego kompromisów. Naszą misją jest dostarczanie rozwiązań, których priorytetami są trwałość, użyteczność, estetyka i bezpieczeństwo zapewnione w każdych warunkach. Dziesięciolecia doświadczeń na rynkach całego świata pozwalają zapewnić obsługę jachtów żaglowych dla najbardziej wymagających Klientów.',
      'Just Rigging is the fruit of many years of sailing passion, experience and uncompromising professionalism. Our mission is to deliver solutions whose priorities are durability, usability, aesthetics and safety in all conditions. Decades of experience in markets around the world allow us to serve sailing yachts for the most demanding Clients.',
      'Just Rigging es el fruto de muchos años de pasión por la vela, experiencia y un profesionalismo sin concesiones. Nuestra misión es ofrecer soluciones cuyas prioridades son la durabilidad, la funcionalidad, la estética y la seguridad en cualquier condición. Décadas de experiencia en mercados de todo el mundo nos permiten atender veleros para los Clientes más exigentes.',
      'Just Rigging ist die Frucht langjähriger Leidenschaft für das Segeln, Erfahrung und kompromissloser Professionalität. Unsere Mission ist es, Lösungen zu liefern, deren Prioritäten Langlebigkeit, Funktionalität, Ästhetik und Sicherheit unter allen Bedingungen sind. Jahrzehntelange Erfahrung auf Märkten in aller Welt ermöglicht uns, Segelyachten für die anspruchsvollsten Kunden zu betreuen.'],

    ['02 / Kompetencje', '02 / Expertise', '02 / Competencias', '02 / Kompetenzen'],
    ['Rozwiązania dla jachtów żaglowych', 'Solutions for sailing yachts', 'Soluciones para veleros', 'Lösungen für Segelyachten'],
    ['Czym się', 'What we', 'A qué nos', 'Was wir'],
    ['zajmujemy.', 'do.', 'dedicamos.', 'tun.'],
    ['Od pojedynczego komponentu po pełną opiekę nad projektem. Cztery obszary, jeden standard wykonania...', 'From a single component to full project support. Four areas, one standard of workmanship...', 'Desde un solo componente hasta el acompañamiento completo del proyecto. Cuatro áreas, un único estándar de ejecución...', 'Von der einzelnen Komponente bis zur umfassenden Projektbetreuung. Vier Bereiche, ein Qualitätsstandard...'],
    ['Omasztowanie jachtu żaglowego', 'Masting of a sailing yacht', 'Arboladura de un velero', 'Mastausrüstung einer Segelyacht'],
    ['Osprzęt i okucia jachtu żaglowego', 'Hardware and fittings of a sailing yacht', 'Herrajes y accesorios de un velero', 'Beschläge und Ausrüstung einer Segelyacht'],
    ['Liny i winda na jachcie żaglowym — detal projektu osprzętu', 'Lines and winch on a sailing yacht — hardware design detail', 'Cabos y winche en un velero: detalle de un proyecto de herrajes', 'Leinen und Winsch auf einer Segelyacht — Detail eines Beschlagprojekts'],
    ['Drewniane omasztowanie klasycznego jachtu żaglowego', 'Wooden masting of a classic sailing yacht', 'Arboladura de madera de un velero clásico', 'Hölzerne Mastausrüstung einer klassischen Segelyacht'],
    ['Maszty i takielunek', 'Masts and rigging', 'Mástiles y jarcia', 'Masten und Rigg'],
    ['Aluminium · Węgiel · Drewno', 'Aluminium · Carbon · Wood', 'Aluminio · Carbono · Madera', 'Aluminium · Carbon · Holz'],
    ['Okucia i osprzęt', 'Fittings and hardware', 'Herrajes y accesorios', 'Beschläge und Zubehör'],
    ['Bezpieczeństwo w każdym detalu', 'Safety in every detail', 'Seguridad en cada detalle', 'Sicherheit in jedem Detail'],
    ['Projekt od podstaw', 'Design from scratch', 'Diseño desde cero', 'Konstruktion von Grund auf'],
    ['Architektoniczne systemy cięgnowe', 'Architectural tensile systems', 'Sistemas de cables arquitectónicos', 'Architektonische Seilsysteme'],
    ['Technologia w architekturze', 'Technology in architecture', 'Tecnología en la arquitectura', 'Technologie in der Architektur'],

    ['Od projektu do gotowego takielunku', 'From design to a finished rig', 'Del proyecto a la jarcia terminada', 'Vom Entwurf zum fertigen Rigg'],
    ['Projektowanie', 'Design', 'Diseño', 'Planung'],
    ['Wykonanie', 'Production', 'Fabricación', 'Fertigung'],
    ['Montaż', 'Installation', 'Montaje', 'Montage'],
    ['Serwis', 'Service', 'Servicio', 'Service'],

    ['03 / Współpraca', '03 / Cooperation', '03 / Colaboración', '03 / Zusammenarbeit'],
    ['Od założeń do sprawdzonego rozwiązania', 'From requirements to a proven solution', 'De los requisitos a una solución probada', 'Von den Anforderungen zur bewährten Lösung'],
    ['Jasny kurs.', 'A clear course.', 'Un rumbo claro.', 'Klarer Kurs.'],
    ['Sprawdzony proces.', 'A proven process.', 'Un proceso probado.', 'Bewährter Prozess.'],
    ['Rozmowa', 'Conversation', 'Conversación', 'Gespräch'],
    ['Poznajemy potrzeby i warunki pracy jachtu.', 'We learn your needs and the yacht’s operating conditions.', 'Conocemos las necesidades y las condiciones de uso del barco.', 'Wir lernen Ihre Bedürfnisse und die Einsatzbedingungen der Yacht kennen.'],
    ['Projekt', 'Design', 'Proyecto', 'Entwurf'],
    ['Dobieramy rozwiązanie i komponenty.', 'We select the solution and components.', 'Seleccionamos la solución y los componentes.', 'Wir wählen Lösung und Komponenten aus.'],
    ['Wdrożenie', 'Implementation', 'Implementación', 'Umsetzung'],
    ['Koordynujemy wykonanie i logistykę.', 'We coordinate production and logistics.', 'Coordinamos la fabricación y la logística.', 'Wir koordinieren Fertigung und Logistik.'],
    ['Testy', 'Testing', 'Pruebas', 'Tests'],
    ['Weryfikujemy działanie i bezpieczeństwo.', 'We verify performance and safety.', 'Verificamos el funcionamiento y la seguridad.', 'Wir prüfen Funktion und Sicherheit.'],
    ['Optymalizacja', 'Optimisation', 'Optimización', 'Optimierung'],
    ['Dopracowujemy rozwiązanie w praktyce.', 'We refine the solution in practice.', 'Perfeccionamos la solución en la práctica.', 'Wir verfeinern die Lösung in der Praxis.'],

    ['04 / Zespół', '04 / Team', '04 / Equipo', '04 / Team'],
    ['Ludzie', 'People', 'Gente', 'Menschen'],
    ['morza.', 'of the sea.', 'de mar.', 'des Meeres.'],
    ['Wojtek przy kole sterowym jachtu', 'Wojtek at the helm of a yacht', 'Wojtek al timón de un velero', 'Wojtek am Steuerrad einer Yacht'],
    ['Paweł w czerwonej kurtce żeglarskiej przy kole sterowym', 'Paweł in a red sailing jacket at the helm', 'Paweł con chaqueta de vela roja al timón', 'Paweł in roter Segeljacke am Steuerrad'],

    ['05 / Kontakt', '05 / Contact', '05 / Contacto', '05 / Kontakt'],
    ['Porozmawiajmy', 'Let’s talk', 'Hablemos', 'Sprechen wir'],
    ['o Twoim projekcie.', 'about your project.', 'de tu proyecto.', 'über Ihr Projekt.'],

    ['Takielunek · Osprzęt · Projekty jachtów żaglowych', 'Rigging · Hardware · Sailing yacht projects', 'Jarcia · Herrajes · Proyectos de veleros', 'Rigg · Beschläge · Segelyachtprojekte'],
    ['Rozwiązania dla jachtów żaglowych i architektury', 'Solutions for sailing yachts and architecture', 'Soluciones para veleros y arquitectura', 'Lösungen für Segelyachten und Architektur'],
    ['Kompleksowa obsługa jednostek żaglowych', 'Comprehensive service for sailing vessels', 'Servicio integral para embarcaciones de vela', 'Umfassender Service für Segelschiffe'],
    ['Head office', 'Head office', 'Sede central', 'Hauptsitz'],
    ['Workshop Gdynia', 'Workshop Gdynia', 'Taller Gdynia', 'Werkstatt Gdynia'],
    ['Workshop Szczecin', 'Workshop Szczecin', 'Taller Szczecin', 'Werkstatt Szczecin'],
    ['Na górę ↑', 'Back to top ↑', 'Volver arriba ↑', 'Nach oben ↑'],
    ['Wróć do oferty ↑', 'Back to offer ↑', 'Volver a la oferta ↑', 'Zurück zum Angebot ↑'],

    ['Custom design — dedykowane rozwiązania dla jachtów żaglowych, od projektu po testy i optymalizację.', 'Custom design — dedicated solutions for sailing yachts, from design to testing and optimisation.', 'Custom design: soluciones a medida para veleros, desde el proyecto hasta las pruebas y la optimización.', 'Custom Design — maßgeschneiderte Lösungen für Segelyachten, vom Entwurf bis zu Tests und Optimierung.'],
    ['Lina na jachtowej windzie na pokładzie żaglowca', 'Line on a yacht winch on the deck of a sailing ship', 'Cabo en un winche de yate sobre la cubierta de un velero', 'Leine auf einer Yachtwinsch an Deck eines Segelschiffs'],
    ['Rozwiązania dedykowane', 'Dedicated solutions', 'Soluciones a medida', 'Maßgeschneiderte Lösungen'],
    ['Projektujemy od podstaw rozwiązania dopasowane do wymagań Klienta i parametrów jachtu.', 'We design solutions from scratch, tailored to the Client’s requirements and the yacht’s parameters.', 'Diseñamos desde cero soluciones adaptadas a los requisitos del Cliente y a los parámetros del barco.', 'Wir entwickeln von Grund auf Lösungen, die auf die Anforderungen des Kunden und die Parameter der Yacht zugeschnitten sind.'],
    ['Od koncepcji do sprawdzonego rozwiązania.', 'From concept to a proven solution.', 'De la idea a una solución probada.', 'Vom Konzept zur bewährten Lösung.'],
    ['Pracujemy w ścisłej współpracy z Klientem. Każdy etap prowadzi do rozwiązania dopasowanego do konkretnej jednostki, jej przeznaczenia i warunków użytkowania.', 'We work in close cooperation with the Client. Every stage leads to a solution tailored to the specific vessel, its purpose and operating conditions.', 'Trabajamos en estrecha colaboración con el Cliente. Cada etapa conduce a una solución adaptada a la embarcación concreta, a su uso y a sus condiciones de explotación.', 'Wir arbeiten eng mit dem Kunden zusammen. Jede Phase führt zu einer Lösung, die auf das konkrete Schiff, seinen Zweck und seine Einsatzbedingungen abgestimmt ist.'],
    ['Realizacja', 'Realisation', 'Realización', 'Realisierung'],
    ['Opowiedz nam o wyzwaniu projektowym.', 'Tell us about your design challenge.', 'Cuéntanos tu reto de diseño.', 'Erzählen Sie uns von Ihrer Projektaufgabe.'],

    ['Omasztowanie, bomy i takielunek aluminiowy, węglowy oraz drewniany dla jachtów żaglowych.', 'Masts, booms and aluminium, carbon and wooden rigging for sailing yachts.', 'Mástiles, botavaras y jarcia de aluminio, carbono y madera para veleros.', 'Masten, Baumen und Rigg aus Aluminium, Carbon und Holz für Segelyachten.'],
    ['Maszty · Bomy · Takielunek', 'Masts · Booms · Rigging', 'Mástiles · Botavaras · Jarcia', 'Masten · Baumen · Rigg'],
    ['Dobór i realizacja systemów omasztowania dla jachtów żaglowych — od klasycznych jednostek po nowoczesne konstrukcje.', 'Selection and delivery of masting systems for sailing yachts — from classic vessels to modern designs.', 'Selección y ejecución de sistemas de arboladura para veleros, desde embarcaciones clásicas hasta diseños modernos.', 'Auswahl und Umsetzung von Mastsystemen für Segelyachten — von klassischen Schiffen bis zu modernen Konstruktionen.'],
    ['Trzy materiały. Jeden standard precyzji.', 'Three materials. One standard of precision.', 'Tres materiales. Un único estándar de precisión.', 'Drei Materialien. Ein Präzisionsstandard.'],
    ['Projektujemy i dostarczamy omasztowanie, bomy i takielunek z aluminium, włókna węglowego oraz drewna do jachtów klasycznych. Rozwiązania bazują na komponentach światowych liderów i są dobierane do charakteru jednostki.', 'We design and supply masts, booms and rigging made of aluminium, carbon fibre and, for classic yachts, wood. The solutions are based on components from world leaders and are matched to the character of the vessel.', 'Diseñamos y suministramos arboladura, botavaras y jarcia de aluminio, fibra de carbono y madera para veleros clásicos. Las soluciones se basan en componentes de líderes mundiales y se adaptan al carácter de la embarcación.', 'Wir entwerfen und liefern Masten, Baumen und Rigg aus Aluminium, Carbonfaser und – für klassische Yachten – Holz. Die Lösungen basieren auf Komponenten weltweiter Marktführer und werden auf den Charakter des Schiffes abgestimmt.'],
    ['01 / Aluminium', '01 / Aluminium', '01 / Aluminio', '01 / Aluminium'],
    ['Aluminiowe', 'Aluminium', 'Aluminio', 'Aluminium'],
    ['Systemy masztowe i bomy dopasowane do konfiguracji oraz przeznaczenia jachtu żaglowego.', 'Mast systems and booms matched to the configuration and purpose of the sailing yacht.', 'Sistemas de mástiles y botavaras adaptados a la configuración y al uso del velero.', 'Mastsysteme und Baumen, abgestimmt auf Konfiguration und Verwendungszweck der Segelyacht.'],
    ['02 / Kompozyty', '02 / Composites', '02 / Materiales compuestos', '02 / Verbundwerkstoffe'],
    ['Węglowe', 'Carbon', 'Carbono', 'Carbon'],
    ['Elementy z włókna węglowego projektowane z myślą o wymaganiach nowoczesnego żeglarstwa.', 'Carbon-fibre components designed for the demands of modern sailing.', 'Elementos de fibra de carbono diseñados para las exigencias de la navegación moderna.', 'Carbonfaser-Komponenten, entwickelt für die Anforderungen des modernen Segelsports.'],
    ['03 / Klasyka', '03 / Classic', '03 / Clásico', '03 / Klassik'],
    ['Drewniane', 'Wooden', 'De madera', 'Holz'],
    ['Omasztowanie i bomy do jachtów klasycznych, z poszanowaniem ich charakteru i funkcji.', 'Masts and booms for classic yachts, respecting their character and function.', 'Arboladura y botavaras para veleros clásicos, respetando su carácter y su función.', 'Masten und Baumen für klassische Yachten – unter Wahrung ihres Charakters und ihrer Funktion.'],
    ['Porozmawiajmy o omasztowaniu Twojego jachtu.', 'Let’s talk about the masting of your yacht.', 'Hablemos de la arboladura de tu velero.', 'Sprechen wir über die Mastausrüstung Ihrer Yacht.'],
    ['Skontaktuj się', 'Get in touch', 'Ponte en contacto', 'Kontakt aufnehmen'],

    ['Okucia i osprzęt jachtowy — certyfikowane komponenty elektryczne i hydrauliczne dla jachtów żaglowych.', 'Yacht fittings and hardware — certified electrical and hydraulic components for sailing yachts.', 'Herrajes y accesorios náuticos: componentes eléctricos e hidráulicos certificados para veleros.', 'Yachtbeschläge und Zubehör — zertifizierte elektrische und hydraulische Komponenten für Segelyachten.'],
    ['Osprzęt na pokładzie jachtu żaglowego', 'Hardware on the deck of a sailing yacht', 'Herrajes en la cubierta de un velero', 'Beschläge an Deck einer Segelyacht'],
    ['Komponenty · Certyfikacja · Bezpieczeństwo', 'Components · Certification · Safety', 'Componentes · Certificación · Seguridad', 'Komponenten · Zertifizierung · Sicherheit'],
    ['Komponenty, które wspierają niezawodną pracę takielunku w warunkach morskich.', 'Components that support reliable rigging performance in marine conditions.', 'Componentes que respaldan el funcionamiento fiable de la jarcia en condiciones marinas.', 'Komponenten, die den zuverlässigen Betrieb des Riggs unter Seebedingungen unterstützen.'],
    ['Dobór osprzętu ma znaczenie.', 'Choosing hardware matters.', 'La elección de los herrajes importa.', 'Die Wahl des Zubehörs ist entscheidend.'],
    ['Zapewniamy okucia i osprzęt spełniające rygorystyczne normy bezpieczeństwa. Dobieramy komponenty do potrzeb jednostki, obejmując wyposażenie elektryczne i hydrauliczne.', 'We supply fittings and hardware that meet strict safety standards. We match components to the needs of the vessel, including electrical and hydraulic equipment.', 'Suministramos herrajes y accesorios que cumplen estrictas normas de seguridad. Seleccionamos los componentes según las necesidades de la embarcación, incluidos equipos eléctricos e hidráulicos.', 'Wir liefern Beschläge und Zubehör, die strenge Sicherheitsnormen erfüllen. Wir wählen die Komponenten passend zum Schiff aus – einschließlich elektrischer und hydraulischer Ausrüstung.'],
    ['01 / Pewność', '01 / Reliability', '01 / Fiabilidad', '01 / Zuverlässigkeit'],
    ['Certyfikowane komponenty', 'Certified components', 'Componentes certificados', 'Zertifizierte Komponenten'],
    ['Pełna certyfikacja i komponenty spełniające wymagane normy bezpieczeństwa.', 'Full certification and components meeting the required safety standards.', 'Certificación completa y componentes que cumplen las normas de seguridad exigidas.', 'Vollständige Zertifizierung und Komponenten, die die geforderten Sicherheitsnormen erfüllen.'],
    ['02 / Systemy', '02 / Systems', '02 / Sistemas', '02 / Systeme'],
    ['03 / Systemy', '03 / Systems', '03 / Sistemas', '03 / Systeme'],
    ['Elektryka', 'Electrics', 'Electricidad', 'Elektrik'],
    ['Osprzęt elektryczny dobrany do zastosowania na jachcie żaglowym.', 'Electrical hardware selected for use on a sailing yacht.', 'Equipos eléctricos seleccionados para su uso en un velero.', 'Elektrisches Zubehör, ausgewählt für den Einsatz auf einer Segelyacht.'],
    ['Hydraulika', 'Hydraulics', 'Hidráulica', 'Hydraulik'],
    ['Komponenty i rozwiązania hydrauliczne dla pracy pokładowych systemów.', 'Hydraulic components and solutions for onboard systems.', 'Componentes y soluciones hidráulicas para los sistemas de a bordo.', 'Hydraulische Komponenten und Lösungen für Bordsysteme.'],
    ['Dobierzemy komponenty do konkretnej jednostki i projektu.', 'We will match the components to your specific vessel and project.', 'Seleccionaremos los componentes para su embarcación y proyecto concretos.', 'Wir wählen die Komponenten passend zu Ihrem Schiff und Projekt aus.'],
    ['Zapytaj o osprzęt', 'Ask about hardware', 'Consulta sobre herrajes', 'Zubehör anfragen'],

    ['Architektoniczne systemy cięgnowe, ekspozycyjne, zadaszenia, przesłony słoneczne i systemy bezpieczeństwa.', 'Architectural tensile systems: display systems, canopies, sun shades and safety systems.', 'Sistemas de cables arquitectónicos, de exposición, cubiertas, protecciones solares y sistemas de seguridad.', 'Architektonische Seilsysteme, Ausstellungssysteme, Überdachungen, Sonnenschutz und Sicherheitssysteme.'],
    ['Maszt i olinowanie jachtu żaglowego', 'Mast and rigging of a sailing yacht', 'Mástil y jarcia de un velero', 'Mast und Takelage einer Segelyacht'],
    ['Technologie cięgnowe poza pokładem', 'Tensile technologies beyond the deck', 'Tecnologías de cables más allá de la cubierta', 'Seiltechnologien jenseits des Decks'],
    ['Wiedzę i doświadczenie z żeglarstwa przekładamy na funkcjonalne rozwiązania architektoniczne.', 'We translate sailing knowledge and experience into functional architectural solutions.', 'Trasladamos nuestro conocimiento y experiencia de la vela a soluciones arquitectónicas funcionales.', 'Wir übertragen unser Wissen und unsere Erfahrung aus dem Segelsport in funktionale architektonische Lösungen.'],
    ['Precyzja konstrukcji. Swoboda formy.', 'Structural precision. Freedom of form.', 'Precisión estructural. Libertad de forma.', 'Konstruktive Präzision. Freiheit der Form.'],
    ['Projektujemy i wdrażamy systemy cięgnowe do obiektów i przestrzeni, gdzie liczy się bezpieczeństwo, trwałość i estetyka.', 'We design and implement tensile systems for buildings and spaces where safety, durability and aesthetics matter.', 'Diseñamos e implementamos sistemas de cables para edificios y espacios donde cuentan la seguridad, la durabilidad y la estética.', 'Wir entwerfen und realisieren Seilsysteme für Objekte und Räume, in denen Sicherheit, Langlebigkeit und Ästhetik zählen.'],
    ['01 / Ekspozycja', '01 / Display', '01 / Exposición', '01 / Ausstellung'],
    ['Muzea i wystawy', 'Museums and exhibitions', 'Museos y exposiciones', 'Museen und Ausstellungen'],
    ['Systemy ekspozycyjne dla muzeów i obiektów wystawienniczych.', 'Display systems for museums and exhibition venues.', 'Sistemas de exposición para museos y recintos expositivos.', 'Ausstellungssysteme für Museen und Ausstellungsobjekte.'],
    ['02 / Ochrona', '02 / Protection', '02 / Protección', '02 / Schutz'],
    ['Zadaszenia', 'Canopies', 'Cubiertas', 'Überdachungen'],
    ['Zadaszenia i przesłony słoneczne dostosowane do przestrzeni i funkcji.', 'Canopies and sun shades adapted to the space and its function.', 'Cubiertas y protecciones solares adaptadas al espacio y a su función.', 'Überdachungen und Sonnenschutz, abgestimmt auf Raum und Funktion.'],
    ['03 / Bezpieczeństwo', '03 / Safety', '03 / Seguridad', '03 / Sicherheit'],
    ['Systemy ochronne', 'Protective systems', 'Sistemas de protección', 'Schutzsysteme'],
    ['Rozwiązania bezpieczeństwa projektowane z myślą o niezawodnym użytkowaniu.', 'Safety solutions designed for reliable use.', 'Soluciones de seguridad diseñadas para un uso fiable.', 'Sicherheitslösungen, entwickelt für zuverlässigen Einsatz.'],
    ['Skonsultuj z nami swój projekt architektoniczny.', 'Consult us on your architectural project.', 'Consulta con nosotros tu proyecto arquitectónico.', 'Besprechen Sie Ihr Architekturprojekt mit uns.'],

    ['Nadzór nad budową, modernizacją i remontem jednostek żaglowych, kontrola wykonawcza, logistyka i optymalizacja.', 'Supervision of the construction, modernisation and refit of sailing vessels, quality control, logistics and optimisation.', 'Supervisión de la construcción, modernización y reparación de embarcaciones de vela, control de ejecución, logística y optimización.', 'Überwachung von Bau, Modernisierung und Refit von Segelschiffen, Ausführungskontrolle, Logistik und Optimierung.'],
    ['Projekt jachtu żaglowego', 'Sailing yacht project', 'Proyecto de un velero', 'Segelyachtprojekt'],
    ['Koordynacja · Nadzór · Optymalizacja', 'Coordination · Supervision · Optimisation', 'Coordinación · Supervisión · Optimización', 'Koordination · Überwachung · Optimierung'],
    ['Zarządzanie projektami', 'Project management', 'Gestión de proyectos', 'Projektmanagement'],
    ['Kompleksowa opieka nad budową, modernizacją i remontami jednostek żaglowych.', 'Comprehensive care for the construction, modernisation and refits of sailing vessels.', 'Atención integral a la construcción, modernización y reparaciones de embarcaciones de vela.', 'Umfassende Betreuung von Bau, Modernisierung und Refit von Segelschiffen.'],
    ['Od planu do realizacji — pod jednym nadzorem.', 'From plan to delivery — under one supervision.', 'Del plan a la realización, bajo una única supervisión.', 'Vom Plan zur Umsetzung — unter einer Leitung.'],
    ['Prowadzimy procesy budowy, modernizacji i remontów jachtów żaglowych. Koordynujemy wykonawców i dostawy oraz wspieramy decyzje techniczne i ekonomiczne.', 'We manage the construction, modernisation and refit of sailing yachts. We coordinate contractors and deliveries and support technical and economic decisions.', 'Gestionamos los procesos de construcción, modernización y reparación de veleros. Coordinamos contratistas y suministros y apoyamos las decisiones técnicas y económicas.', 'Wir leiten Bau-, Modernisierungs- und Refit-Prozesse von Segelyachten. Wir koordinieren Ausführende und Lieferungen und unterstützen technische und wirtschaftliche Entscheidungen.'],
    ['01 / Jakość', '01 / Quality', '01 / Calidad', '01 / Qualität'],
    ['Kontrola wykonawcza', 'Quality control', 'Control de ejecución', 'Ausführungskontrolle'],
    ['Nadzór nad zgodnością prac z założeniami projektu i wymaganiami jednostki.', 'Supervision of compliance of the work with the project assumptions and the vessel’s requirements.', 'Supervisión de que los trabajos cumplan los requisitos del proyecto y de la embarcación.', 'Überwachung der Übereinstimmung der Arbeiten mit den Projektvorgaben und den Anforderungen des Schiffes.'],
    ['02 / Organizacja', '02 / Organisation', '02 / Organización', '02 / Organisation'],
    ['Logistyka', 'Logistics', 'Logística', 'Logistik'],
    ['Koordynacja wykonawców, terminów, dostaw i montaży.', 'Coordination of contractors, schedules, deliveries and installations.', 'Coordinación de contratistas, plazos, suministros y montajes.', 'Koordination von Ausführenden, Terminen, Lieferungen und Montagen.'],
    ['03 / Efektywność', '03 / Efficiency', '03 / Eficiencia', '03 / Effizienz'],
    ['Analiza rozwiązań technicznych i ekonomicznych na kolejnych etapach prac.', 'Analysis of technical and economic solutions at successive stages of work.', 'Análisis de soluciones técnicas y económicas en las sucesivas etapas de los trabajos.', 'Analyse technischer und wirtschaftlicher Lösungen in den einzelnen Arbeitsphasen.'],
    ['Ustalmy zakres i następny krok Twojego projektu.', 'Let’s define the scope and the next step of your project.', 'Definamos el alcance y el siguiente paso de tu proyecto.', 'Legen wir Umfang und nächsten Schritt Ihres Projekts fest.']
  ];

  const norm = text => text.replace(/\s+/g, ' ').trim();
  const dict = new Map(rows.map(row => [norm(row[0]), row]));
  const nodeOriginals = new WeakMap();
  const attrOriginals = new WeakMap();
  const ATTRS = ['alt', 'aria-label'];
  const meta = document.querySelector('meta[name="description"]');
  const originalTitle = document.title;
  const originalDescription = meta?.getAttribute('content') ?? '';
  const names = { pl: 'Polski', en: 'English', es: 'Español', de: 'Deutsch' };

  let current = 'pl';

  const translate = (text, lang = current) => {
    const row = dict.get(norm(text));
    return row ? row[LANGS.indexOf(lang)] : text;
  };

  const applyText = lang => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (node.parentElement?.closest('script, style')) continue;
      if (!nodeOriginals.has(node)) nodeOriginals.set(node, node.nodeValue);
      const original = nodeOriginals.get(node);
      const row = dict.get(norm(original));
      if (!row) continue;
      const lead = original.match(/^\s*/)[0];
      const trail = original.match(/\s*$/)[0];
      node.nodeValue = lang === 'pl' ? original : lead + row[LANGS.indexOf(lang)] + trail;
    }
  };

  const applyAttributes = lang => {
    document.querySelectorAll('[alt], [aria-label]').forEach(el => {
      if (el.classList.contains('menu-toggle') || el.closest('.lang-switch button')) return;
      let saved = attrOriginals.get(el);
      if (!saved) attrOriginals.set(el, saved = {});
      ATTRS.forEach(attr => {
        if (!el.hasAttribute(attr)) return;
        if (!(attr in saved)) saved[attr] = el.getAttribute(attr);
        el.setAttribute(attr, lang === 'pl' ? saved[attr] : translate(saved[attr], lang));
      });
    });
  };

  const buildSwitch = () => {
    document.querySelectorAll('.mobile-menu').forEach(menu => {
      if (menu.querySelector('.lang-switch')) return;
      const group = document.createElement('div');
      group.className = 'lang-switch';
      group.setAttribute('role', 'group');
      group.setAttribute('aria-label', 'Język');
      LANGS.forEach(code => {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.lang = code;
        button.lang = code;
        button.textContent = code.toUpperCase();
        button.setAttribute('aria-label', names[code]);
        button.addEventListener('click', () => setLanguage(code));
        group.appendChild(button);
      });
      menu.appendChild(group);
    });
  };

  const setLanguage = (lang, persist = true) => {
    if (!LANGS.includes(lang)) lang = 'pl';
    current = lang;
    document.documentElement.lang = lang;
    applyText(lang);
    applyAttributes(lang);
    document.title = lang === 'pl' ? originalTitle : translate(originalTitle, lang);
    meta?.setAttribute('content', lang === 'pl' ? originalDescription : translate(originalDescription, lang));
    document.querySelectorAll('.lang-switch button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === lang)));
    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* brak dostępu do pamięci lokalnej */ }
    }
    document.dispatchEvent(new CustomEvent('jr:lang', { detail: lang }));
  };

  window.jrI18n = { t: translate, set: setLanguage, get: () => current };

  buildSwitch();
  let saved = 'pl';
  try { saved = localStorage.getItem(STORAGE_KEY) || 'pl'; } catch { /* brak dostępu do pamięci lokalnej */ }
  setLanguage(saved, false);
})();
