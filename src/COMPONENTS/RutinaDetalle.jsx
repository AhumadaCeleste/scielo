import { useParams, Link } from "react-router-dom";
import imagen1 from "../IMAGES/RutinaAcneica.jpg";
import imagen2 from "../IMAGES/CremaCorporal.png";
import imagen3 from "../IMAGES/AntiManchas.jpg"

function DetRutinas() {
  // Obtenemos el parámetro dinámico ":id" de la URL
  const { id } = useParams();

  // Supongamos que tenemos una lista de productos
  const DetRutinas = [
    {
      id: 1,
      name: "LIMPIEZA E HIDRATACION PARA ROSTRO GRASO",
      description: "En la mañana, es crucial observarte en el espejo para identificar las zonas más brillantes, que son aquellas con mayor grasa. Aplica Bruma Micelar en discos de limpieza y, con movimientos suaves, pásalos por el rostro. Posteriormente, es esencial enjuagar con agua, ya que las aguas micelares deben retirarse. Luego, aplica una emulsión liviana de rápida absorción. Dos veces por semana, realiza una exfoliación astringente. Aprovecha el momento de la ducha, cuando los poros se abren debido al vapor, para llevar a cabo esta limpieza profunda. Después de la exfoliación, es fundamental hidratar con emulsión. ",
      img: imagen1,
    },
    {
      id: 2,
      name: "HUMECTACION POST DUCHA",
      description:
        "La nutrición post-ducha se vuelve esencial para restablecer los aceites esenciales de tu piel. Después de cada ducha, no solo buscas mantener la frescura, sino también aliviar esa incómoda sensación de tirantez y resequedad. Nuestra crema corporal no solo garantiza una hidratación profunda, sino que se absorbe rápidamente, eliminando la espera innecesaria.",
      img: imagen2,
    },
    {
      id: 3,
      name: "TRATAMIENTO ANTI-MANCHAS",
      description:
        "Es frecuente que la piel desarrolle manchas debido a la exposición solar y al proceso natural de envejecimiento. La vitamina C emerge como un potente agente aclarante, actuando como antioxidante para reducir la apariencia de las manchas y fomentar un tono de piel más uniforme. Al integrar productos enriquecidos con vitamina C en tu rutina de cuidado de la piel, podrás disfrutar de sus beneficios iluminadores y revitalizantes. Esta vitamina no solo ayuda a disminuir las manchas oscuras, sino que también estimula la producción de colágeno, otorgando firmeza y elasticidad a la piel. Complementar esta rutina con una exfoliación semanal puede mejorar aún más los resultados, ya que contribuye a eliminar las células muertas y promover la regeneración de nuevas, manteniendo la piel fresca y radiante. ",
      img: imagen3,
    },
    {
      id: 4,
      name: "HUMECTACION POST DUCHA",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem possimus pariatur quam placeat magni saepe ut fugit, nisi officia quas et doloribus aperiam ex quo quisquam veritatis aliquam. Corporis, earum?",
      img: imagen2,
    },
    {
      id: 5,
      name: "HUMECTACION POST DUCHA",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem possimus pariatur quam placeat magni saepe ut fugit, nisi officia quas et doloribus aperiam ex quo quisquam veritatis aliquam. Corporis, earum?",
      img: imagen2,
    },
    {
      id: 6,
      name: "HUMECTACION POST DUCHA",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem possimus pariatur quam placeat magni saepe ut fugit, nisi officia quas et doloribus aperiam ex quo quisquam veritatis aliquam. Corporis, earum?",
      img: imagen2,
    },
    {
      id: 7,
      name: "HUMECTACION POST DUCHA",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem possimus pariatur quam placeat magni saepe ut fugit, nisi officia quas et doloribus aperiam ex quo quisquam veritatis aliquam. Corporis, earum?",
      img: imagen2,
    },
    {
      id: 8,
      name: "HUMECTACION POST DUCHA",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem possimus pariatur quam placeat magni saepe ut fugit, nisi officia quas et doloribus aperiam ex quo quisquam veritatis aliquam. Corporis, earum?",
      img: imagen2,
    },
    {
      id: 9,
      name: "HUMECTACION POST DUCHA",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem possimus pariatur quam placeat magni saepe ut fugit, nisi officia quas et doloribus aperiam ex quo quisquam veritatis aliquam. Corporis, earum?",
      img: imagen2,
    },
    
    
  ];

  // Buscamos el producto correspondiente en base al ID
  const productDT = DetRutinas.find((p) => p.id === parseInt(id));

  if (!productDT) {
    return <div>Rutina no encontrada.</div>;
  }

  return (
    <div className="bg-primary p-8 rounded-lg shadow-lg text-center" style={{ marginTop: '25px' }}>
      <h2 className="mb-4 text-2xl font-semibold">{productDT.name}</h2>
      <p className="mb-4">{productDT.description}</p>
      <div className="flex justify-center items-center flex-col">
        <div className="h-16 w-36 mb-4"></div>
        <div className="mt-2 flex justify-center items-center">
          <img
            src={productDT.img}
            alt="Imagen del producto"
            style={{ width: '320px', height: '320px', marginTop: '-48px' }}
          />
        </div>
        <hr />
        <br></br>
        <hr />
        <div className="flex">
          <button className="border-2 rounded-lg border-gray-300 h-10 w-20 titulo_tarjetas m-4">
            <Link to="/rutinas">Regresar</Link>
          </button>
          <button className="border-2 rounded-lg border-gray-300 h-10 w-20 titulo_tarjetas m-4">
            <Link to="/compra">Comprar</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetRutinas;