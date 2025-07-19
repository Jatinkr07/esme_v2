// import { useState, useEffect } from "react";
// import { Form, Input, Select, Button, Tabs, message } from "antd";
// import { CloseOutlined } from "@ant-design/icons";
// import CKEditorComponent from "../Editor/CKEditorComponent";

// const { Option } = Select;

// const ProductForm = ({ initialData, onSave, onCancel }) => {
//   const [form] = Form.useForm();
//   const [activeTab, setActiveTab] = useState("1");
//   const [ingredients, setIngredients] = useState([""]);
//   const [editorData, setEditorData] = useState({
//     productBenefits: "",
//     productBenefitsArabic: "",
//     methodsOfUse: "",
//     methodsOfUseArabic: "",
//     productComposition: "",
//     productCompositionArabic: "",
//     productSummary: "",
//     productSummaryArabic: "",
//   });

//   useEffect(() => {
//     if (initialData) {
//       form.setFieldsValue(initialData);
//       if (initialData.ingredients) {
//         setIngredients(initialData.ingredients);
//       }
//       setEditorData({
//         productBenefits: initialData.productBenefits || "",
//         productBenefitsArabic: initialData.productBenefitsArabic || "",
//         methodsOfUse: initialData.methodsOfUse || "",
//         methodsOfUseArabic: initialData.methodsOfUseArabic || "",
//         productComposition: initialData.productComposition || "",
//         productCompositionArabic: initialData.productCompositionArabic || "",
//         productSummary: initialData.productSummary || "",
//         productSummaryArabic: initialData.productSummaryArabic || "",
//       });
//     }
//   }, [initialData, form]);

//   const handleSubmit = async () => {
//     try {
//       const values = await form.validateFields();

//       const formData = {
//         ...values,
//         ...editorData,
//         ingredients: ingredients.filter((ing) => ing.trim() !== ""),
//       };

//       onSave(formData);
//     } catch (error) {
//       console.log(error);
//       message.error("Please fill in all required fields");
//     }
//   };

//   const handleEditorChange = (field, data) => {
//     setEditorData((prev) => ({
//       ...prev,
//       [field]: data,
//     }));
//   };

//   const addIngredient = () => {
//     setIngredients([...ingredients, ""]);
//   };

//   const updateIngredient = (index, value) => {
//     const newIngredients = [...ingredients];
//     newIngredients[index] = value;
//     setIngredients(newIngredients);
//   };

//   const removeIngredient = (index) => {
//     setIngredients(ingredients.filter((_, i) => i !== index));
//   };

//   const tabItems = [
//     {
//       key: "1",
//       label: "Product Information",
//       children: (
//         <Form form={form} layout="vertical" className="space-y-4">
//           <Form.Item
//             label="Category"
//             name="category"
//             rules={[{ required: true, message: "Please select a category" }]}
//           >
//             <Select placeholder="Select...">
//               <Option value="Skin Beauty">Skin Beauty</Option>
//               <Option value="Health Supplements">Health Supplements</Option>
//               <Option value="Vitamins">Vitamins</Option>
//             </Select>
//           </Form.Item>

//           <Form.Item
//             label="Name in english"
//             name="name"
//             rules={[{ required: true, message: "Please enter product name" }]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item label="Name in arabic" name="nameArabic">
//             <Input />
//           </Form.Item>

//           <Form.Item label="Product Summary">
//             <CKEditorComponent
//               data={editorData.productSummary}
//               onChange={(data) => handleEditorChange("productSummary", data)}
//               placeholder="Enter product summary in English"
//               height={150}
//             />
//           </Form.Item>

//           <Form.Item label="Product Summary">
//             <CKEditorComponent
//               data={editorData.productSummaryArabic}
//               onChange={(data) =>
//                 handleEditorChange("productSummaryArabic", data)
//               }
//               placeholder="Enter product summary in Arabic"
//               height={150}
//             />
//           </Form.Item>

//           <Form.Item label="Ingredients">
//             <div className="space-y-2">
//               {ingredients.map((ingredient, index) => (
//                 <div key={index} className="flex items-center space-x-2">
//                   <Input
//                     value={ingredient}
//                     onChange={(e) => updateIngredient(index, e.target.value)}
//                     placeholder="Enter ingredient"
//                   />
//                   {ingredients.length > 1 && (
//                     <Button
//                       type="link"
//                       icon={<CloseOutlined />}
//                       onClick={() => removeIngredient(index)}
//                       className="text-red-500"
//                     />
//                   )}
//                 </div>
//               ))}
//               <Button type="dashed" onClick={addIngredient} className="w-full">
//                 Add
//               </Button>
//             </div>
//           </Form.Item>
//         </Form>
//       ),
//     },
//     {
//       key: "2",
//       label: "Benefits",
//       children: (
//         <Form form={form} layout="vertical" className="space-y-4">
//           <Form.Item label="Product Benefits">
//             <CKEditorComponent
//               data={editorData.productBenefits}
//               onChange={(data) => handleEditorChange("productBenefits", data)}
//               placeholder="Enter product benefits in English"
//               height={150}
//             />
//           </Form.Item>

//           <Form.Item label="Product Benefits">
//             <CKEditorComponent
//               data={editorData.productBenefitsArabic}
//               onChange={(data) =>
//                 handleEditorChange("productBenefitsArabic", data)
//               }
//               placeholder="Enter product benefits in Arabic"
//               height={150}
//             />
//           </Form.Item>
//         </Form>
//       ),
//     },
//     {
//       key: "3",
//       label: "Methods of use",
//       children: (
//         <Form form={form} layout="vertical" className="space-y-4">
//           <Form.Item label="Methods of Use">
//             <CKEditorComponent
//               data={editorData.methodsOfUse}
//               onChange={(data) => handleEditorChange("methodsOfUse", data)}
//               placeholder="Enter methods of use in English"
//               height={150}
//             />
//           </Form.Item>

//           <Form.Item label="Methods of Use">
//             <CKEditorComponent
//               data={editorData.methodsOfUseArabic}
//               onChange={(data) =>
//                 handleEditorChange("methodsOfUseArabic", data)
//               }
//               placeholder="Enter methods of use in Arabic"
//               height={150}
//             />
//           </Form.Item>
//         </Form>
//       ),
//     },
//     {
//       key: "4",
//       label: "Composition",
//       children: (
//         <Form form={form} layout="vertical" className="space-y-4">
//           <Form.Item label="Product Composition">
//             <CKEditorComponent
//               data={editorData.productComposition}
//               onChange={(data) =>
//                 handleEditorChange("productComposition", data)
//               }
//               placeholder="Enter product composition in English"
//               height={150}
//             />
//           </Form.Item>

//           <Form.Item label="Product Composition">
//             <CKEditorComponent
//               data={editorData.productCompositionArabic}
//               onChange={(data) =>
//                 handleEditorChange("productCompositionArabic", data)
//               }
//               placeholder="Enter product composition in Arabic"
//               height={150}
//             />
//           </Form.Item>
//         </Form>
//       ),
//     },
//   ];

//   return (
//     <div className="overflow-y-auto max-h-96">
//       <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
//       <div className="flex justify-end pt-4 mt-6 space-x-2 border-t">
//         <Button onClick={onCancel}>Back</Button>
//         <Button
//           type="primary"
//           onClick={handleSubmit}
//           className="bg-purple-500 border-purple-500 hover:bg-purple-600"
//         >
//           {activeTab === "4" ? "Save" : "Next"}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ProductForm;

import { useState, useEffect } from "react";
import { Form, Input, Select, Button, Tabs, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import TipTapComponent from "../Editor/TipTapComponent";

const { Option } = Select;

const ProductForm = ({ initialData, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState("1");
  const [ingredients, setIngredients] = useState([""]);
  const [editorData, setEditorData] = useState({
    productBenefits: "",
    productBenefitsArabic: "",
    methodsOfUse: "",
    methodsOfUseArabic: "",
    productComposition: "",
    productCompositionArabic: "",
    productSummary: "",
    productSummaryArabic: "",
  });

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
      if (initialData.ingredients) {
        setIngredients(initialData.ingredients);
      }
      setEditorData({
        productBenefits: initialData.productBenefits || "",
        productBenefitsArabic: initialData.productBenefitsArabic || "",
        methodsOfUse: initialData.methodsOfUse || "",
        methodsOfUseArabic: initialData.methodsOfUseArabic || "",
        productComposition: initialData.productComposition || "",
        productSummary: initialData.productSummary || "",
        productSummaryArabic: initialData.productSummaryArabic || "",
      });
    }
  }, [initialData, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const formData = {
        ...values,
        ...editorData,
        ingredients: ingredients.filter((ing) => ing.trim() !== ""),
      };

      onSave(formData);
    } catch (error) {
      console.log(error);
      message.error("Please fill in all required fields");
    }
  };

  const handleEditorChange = (field, data) => {
    setEditorData((prev) => ({
      ...prev,
      [field]: data,
    }));
  };

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const updateIngredient = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const tabItems = [
    {
      key: "1",
      label: "Product Information",
      children: (
        <Form form={form} layout="vertical" className="space-y-4">
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select placeholder="Select...">
              <Option value="Skin Beauty">Skin Beauty</Option>
              <Option value="Health Supplements">Health Supplements</Option>
              <Option value="Vitamins">Vitamins</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Name in English"
            name="name"
            rules={[{ required: true, message: "Please enter product name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Name in Arabic" name="nameArabic">
            <Input />
          </Form.Item>

          <Form.Item label="Product Summary in English">
            <TipTapComponent
              data={editorData.productSummary}
              onChange={(data) => handleEditorChange("productSummary", data)}
              placeholder="Enter product summary in English"
              height={150}
            />
          </Form.Item>

          <Form.Item label="Product Summary in Arabic">
            <TipTapComponent
              data={editorData.productSummaryArabic}
              onChange={(data) =>
                handleEditorChange("productSummaryArabic", data)
              }
              placeholder="Enter product summary in Arabic"
              height={150}
            />
          </Form.Item>

          <Form.Item label="Ingredients">
            <div className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={ingredient}
                    onChange={(e) => updateIngredient(index, e.target.value)}
                    placeholder="Enter ingredient"
                  />
                  {ingredients.length > 1 && (
                    <Button
                      type="link"
                      icon={<CloseOutlined />}
                      onClick={() => removeIngredient(index)}
                      className="text-red-500"
                    />
                  )}
                </div>
              ))}
              <Button type="dashed" onClick={addIngredient} className="w-full">
                Add
              </Button>
            </div>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "2",
      label: "Benefits",
      children: (
        <Form form={form} layout="vertical" className="space-y-4">
          <Form.Item label="Product Benefits in English">
            <TipTapComponent
              data={editorData.productBenefits}
              onChange={(data) => handleEditorChange("productBenefits", data)}
              placeholder="Enter product benefits in English"
              height={150}
            />
          </Form.Item>

          <Form.Item label="Product Benefits in Arabic">
            <TipTapComponent
              data={editorData.productBenefitsArabic}
              onChange={(data) =>
                handleEditorChange("productBenefitsArabic", data)
              }
              placeholder="Enter product benefits in Arabic"
              height={150}
            />
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "3",
      label: "Methods of Use",
      children: (
        <Form form={form} layout="vertical" className="space-y-4">
          <Form.Item label="Methods of Use in English">
            <TipTapComponent
              data={editorData.methodsOfUse}
              onChange={(data) => handleEditorChange("methodsOfUse", data)}
              placeholder="Enter methods of use in English"
              height={150}
            />
          </Form.Item>

          <Form.Item label="Methods of Use in Arabic">
            <TipTapComponent
              data={editorData.methodsOfUseArabic}
              onChange={(data) =>
                handleEditorChange("methodsOfUseArabic", data)
              }
              placeholder="Enter methods of use in Arabic"
              height={150}
            />
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "4",
      label: "Composition",
      children: (
        <Form form={form} layout="vertical" className="space-y-4">
          <Form.Item label="Product Composition in English">
            <TipTapComponent
              data={editorData.productComposition}
              onChange={(data) =>
                handleEditorChange("productComposition", data)
              }
              placeholder="Enter product composition in English"
              height={150}
            />
          </Form.Item>

          <Form.Item label="Product Composition in Arabic">
            <TipTapComponent
              data={editorData.productCompositionArabic}
              onChange={(data) =>
                handleEditorChange("productCompositionArabic", data)
              }
              placeholder="Enter product composition in Arabic"
              height={150}
            />
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div className="overflow-y-auto max-h-96">
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
      <div className="flex justify-end pt-4 mt-6 space-x-2 border-t">
        <Button onClick={onCancel}>Back</Button>
        <Button
          type="primary"
          onClick={handleSubmit}
          className="bg-purple-500 border-purple-500 hover:bg-purple-600"
        >
          {activeTab === "4" ? "Save" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default ProductForm;
