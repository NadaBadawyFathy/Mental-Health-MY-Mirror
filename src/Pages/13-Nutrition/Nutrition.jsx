import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import xmark from "../../assests/svgs/xmark.svg";
import { Base } from '../../../Api';

const Nutrition = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('recipes');
  const [activeFilterRecipes, setActiveFilterRecipes] = useState('الكل');
  const [activeFilterTips, setActiveFilterTips] = useState('الكل');

  const [recipes, setRecipes] = useState([]);
  const [tips, setTips] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${Base}recipes/recip`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("Recipes Response:", data);

    if (Array.isArray(data)) {
      setRecipes(data);
    } else if (Array.isArray(data.data)) {
      setRecipes(data.data);
    } else {
      console.warn("Unexpected recipe format");
    }
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
  }
};


    const fetchTips = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${Base}tips`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("Tips Response:", data);

    if (Array.isArray(data)) {
      setTips(data);
    } else if (Array.isArray(data.data)) {
      setTips(data.data);
    } else {
      console.warn("Unexpected tips format");
    }
  } catch (error) {
    console.error("Failed to fetch tips:", error);
  }
};


    fetchRecipes();
    fetchTips();
  }, []);

  const categoriesRecipes = ['الكل', 'أطباق رئيسية', 'أطباق المقبلات', 'حلويات', 'اسناكس', 'المشروبات'];
  const categoriesTips = ['الكل', 'التغذية الصحية', 'نمط الحياة الصحي', 'الصحة النفسية والعقلية', 'النظافة والعادات الصحية'];

  const filteredRecipes = activeFilterRecipes === 'الكل'
    ? recipes
    : recipes.filter(r => r.category === activeFilterRecipes);

  const filteredTips = activeFilterTips === 'الكل'
    ? tips
    : tips.filter(r => r.category === activeFilterTips);

  return (
    <div className="mx-auto overflow-hidden p-4 text-right font-sans" dir="rtl">
      <div className="relative p-4">
        <div>
          <h2 className="font-bold text-lg mt-3" style={{ color: '#664500', fontSize: '35px' }}>التغذية الصحية</h2>
          <p className="text-bg text-gray-700 mt-3" style={{ fontSize: '20px' }}>
            ابحث عن موارد تساعدك تختار أكلات ومشروبات صحية وكمان نصايح عن النشاط البدني. حقق أهدافك الصحية.
          </p>
        </div>
        <button className="absolute top-4 left-4 rounded-full p-2 text-xl z-10" onClick={() => navigate('/Home')}>
          <img src={xmark} alt="xmark" style={{ cursor: "pointer", position: "relative", top: "-15px", padding: "20px", backgroundColor: "rgb(210 243 238)", width: "28px", borderRadius: "50%" }} />
        </button>
        <div className="flex justify-center">
          <img src="https://i.pinimg.com/736x/98/54/01/985401ce7dce96ca848036a032067e17.jpg" alt="healthy food" className="object-cover rounded-lg w-4/5" style={{ height: '500px', marginTop: "80px" }} />
        </div>
      </div>

      <div className="flex justify-around mt-4 p-4" style={{ fontSize: '25px', borderBottom: '1px solid #75838C', marginBottom: "4rem" }}>
        <button onClick={() => setActiveTab('recipes')} style={{ borderBottom: activeTab === 'recipes' ? '2px solid #664500' : 'none', color: activeTab === 'recipes' ? '#664500' : '#000', paddingBottom: '10px' }}>
          الوصفات
        </button>
        <button onClick={() => setActiveTab('tips')} style={{ borderBottom: activeTab === 'tips' ? '2px solid #664500' : 'none', color: activeTab === 'tips' ? '#664500' : '#000', paddingBottom: '10px' }}>
          نصائح
        </button>
      </div>

      {/* عرض الوصفات */}
      {activeTab === 'recipes' && (
        <div>
          <div className="flex flex-wrap gap-5 mt-4 justify-center align-center mx-auto" style={{ marginBottom: "6rem" }}>
            {categoriesRecipes.map(cat => (
              <button key={cat} onClick={() => setActiveFilterRecipes(cat)} style={{ padding: '4px 12px', borderRadius: '9999px', fontSize: '20px', border: '1px solid #ccc', backgroundColor: activeFilterRecipes === cat ? '#228D7B' : '#f3f4f6', color: activeFilterRecipes === cat ? '#fff' : '#374151' }}>
                {cat}
              </button>
            ))}
          </div>
          <div className="flex justify-center mt-4 mb-6">
  <div className="grid grid-cols-3 gap-6 cursor-pointer">
    {Array.isArray(filteredRecipes) && filteredRecipes.map(recipe => (
      <div
        key={recipe.id}
        className="flex flex-col items-center justify-between bg-white shadow rounded-lg p-4"
        style={{ width: '300px', height: '250px' }}
        onClick={() => navigate(`/Home/Nutrition/PreparationAmounts`, { state: recipe })}
      >
        <div className="flex items-center justify-center w-full h-3/4">
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="object-contain max-h-full max-w-full"
          />
        </div>
        <p className="mt-2 text-center font-medium" style={{ fontSize: '20px' }}>
          {recipe.name}
        </p>
      </div>
    ))}
  </div>
</div>

        </div>
      )}

      {/* عرض النصائح */}
      {activeTab === 'tips' && (
        <div>
          <div className="flex flex-wrap gap-5 mt-4 justify-center align-center mx-auto">
            {categoriesTips.map(cat => (
              <button key={cat} onClick={() => setActiveFilterTips(cat)} style={{ padding: '4px 12px', borderRadius: '9999px', fontSize: '20px', border: '1px solid #ccc', backgroundColor: activeFilterTips === cat ? '#228D7B' : '#f3f4f6', color: activeFilterTips === cat ? '#fff' : '#374151', marginBottom: "4rem" }}>
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-start mt-4 px-4">
  {Array.isArray(filteredTips) && filteredTips.map((tip, index) => (
    <div
      key={index}
      className="rounded-xl shadow-lg p-6 sm:p-8 text-center border border-gray-100 text-[22px] sm:text-[20px]"
      style={{ boxShadow: "rgb(207 119 35 / 42%) 0px 5px 2px" }}
    >
      <p className="text-gray-700 font-medium leading-7">{tip.content}</p>
    </div>
  ))}
</div>

        </div>
      )}
    </div>
  );
};

export default Nutrition;
