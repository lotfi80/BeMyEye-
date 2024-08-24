import {Category} from "../src/models/Categories";
import connectDB from "../src/libs/db";

connectDB();

const categoeries = [
    { name: "Haushalt" },
    { name: "Heimwerker-Garten" },
    { name: "Möbel-Wohnen" },
    { name: "Jobs-Karriere" },
    { name: "Lebensmitteln" },
    { name: "Klamotten" },
    { name: "Shuhen" },
    { name: "Sport & Freizeit" },
    { name: "Kunst & Handwerk " },


  
]
 const categoriesInsert = async () => {
    try {
        await Category.insertMany(categoeries);
        console.log("Categories inserted successfully");
    } catch (err) {
        console.error(err);
    }
};

categoriesInsert();
