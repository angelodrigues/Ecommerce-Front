import { useState, useEffect } from "react";
import SectionTitle from "../section/sectionTitle";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../service/CartContext";
import { getAllProducts, getProductImageUrl } from "../../service/productService";

export default function Product() {

    const { addToCart } = useCart();

    const [active, setActive] = useState({
        id: 0,
        product: 'all'
    });

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const productTitle = [
        {
            id: 0,
            title: "all",
            product: 'all'
        },
        {
            id: 1,
            title: "newest",
            product: 'newest'
        },
        {
            id: 3,
            title: "best seller",
            product: 'best_seller'
        },
    ];

    useEffect(() => {
        setLoading(true);
        getAllProducts()
            .then(data => {
                // Adiciona categorias fixas para popular as sessões
                const withCategories = data.map((prod, idx, arr) => {
                    let category = 'all';
                    if (idx >= arr.length - 4) category = 'newest';
                    if ([0, 3, 5, 7].includes(idx)) category = 'best_seller';
                    return { ...prod, category };
                });
                setProducts(withCategories);
                setLoading(false);
            })
            .catch(err => {
                setError('Erro ao buscar produtos');
                setLoading(false);
            });
    }, []);

    const productFilter = active.product === 'all'
        ? products
        : products.filter(product => product.category === active.product);

    return (
        <div className="lg:container mx-auto bg-[#302c2c]">
            <div className="flex flex-col items-center justify-center">
                <SectionTitle title={'our product'} textAlign={'center'} mb={'mb-5'}></SectionTitle>


                <div className="flex items-center justify-center gap-6 mb-11">
                    {
                        productTitle?.map((title, indx) => (
                            <button key={title?.id}

                                onClick={() => setActive({
                                    id: title?.id,
                                    product: title?.product
                                })}
                                className={`text-base font-black uppercase font-inter cursor-pointer ${
                                    active?.id === title?.id ? 'text-[#dc7e27]' : 'text-gray-400 hover:text-[#dc7e27]'
                                }`}>
                                {title?.title}
                            </button>
                        ))
                    }
                </div>
            </div>


            <div className="grid grid-cols-4 items-center gap-6">
                {
                    loading ? (
                        <div className="col-span-4 text-center text-white">Carregando produtos...</div>
                    ) : error ? (
                        <div className="col-span-4 text-center text-red-500">{error}</div>
                    ) : productFilter.length === 0 ? (
                        <div className="col-span-4 text-center text-white">Nenhum produto encontrado.</div>
                    ) : (
                        productFilter.map((product, index) => (
                            <div key={product.id} className="p-4 bg-[#3a3636] rounded-lg">
                                <div className="feature_image mb-4 relative">
                                    <img className="w-full max-h-[312px] rounded-lg object-cover" src={getProductImageUrl(product.id)} alt={product.name || product.title} />
                                </div>
                                <div className="feature_content">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-base text-[#dc7e27] capitalize font-inter font-normal mb-4">{product.name || product.title}</h4>
                                        <span
                                            className="bg-[#dc7e27] h-[44px] w-[44px] rounded-lg flex items-center justify-center hover:bg-[#e8934a] transition-colors cursor-pointer"
                                            onClick={() => addToCart({ 
                                                id: product.id,
                                                name: product.name || product.title, 
                                                price: Number(product.price), 
                                                quantity: 1, 
                                                image: getProductImageUrl(product.id)
                                            })}
                                        >
                                            <ShoppingCart size='1.5rem' color="#fff" />
                                        </span>
                                    </div>
                                    <p className="text-xl flex items-center gap-2 text-white font-semibold font-inter">
                                        R$ {Number(product.price).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    );
};