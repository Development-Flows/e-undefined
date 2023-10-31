"use client"
import ProductGroupComp from "@/components/ProductGroupComp";
import InputComp from "@/components/InputComp";
import {useState} from "react";
import Axios from 'axios'
import {Button, message} from 'antd'
import {ICategory, ICreateCategoryResponse} from "@/app/admin/panel/categories/type";

function AddCategory() {
    const [categoryData, setCategoryData] = useState<ICategory>({name: '', seoDesc: '', seoUrl: ''})
    const [loading, setLoading] = useState<boolean>(false)
    const [disabled, setDisabled] = useState(false)

    function onChangeHandler(name: keyof ICategory, value: string) {
        if (!name | !value) return
        setCategoryData((prevData) => ({...prevData, [name]: value}))
        buttonValidHandler()
    }

    async function createCategoryReq(params: ICategory) {

        setLoading(true)
        const result: ICreateCategoryResponse = await Axios.post(`/category/create`, {
            ...categoryData,
            categoryText: categoryData.categoryText ?? undefined
        })
        setLoading(false)
        if (result.status) {
            message.success("Kategori oluşturma başarılı")
            setCategoryData({seoUrl: '', seoDesc: '', name: ''})
        } else {
            message.error("Kategori oluşturma başarısız")
        }
    }

    function buttonValidHandler() {
        const necessaryField = ["name", "seoDesc", "seoUrl"]
        const result = necessaryField.every((key) => categoryData[key] && categoryData[key]?.length > 3)
        setDisabled(result)
    }

    return <div>
        <div style={{display: 'flex', justifyContent: 'flex-end', padding: '6px 0'}}>
            <Button loading={loading} disabled={!disabled} onClick={() => createCategoryReq(categoryData)}
                    type={"primary"}>Kaydet</Button>
        </div>
        <ProductGroupComp groupTitle={"Temel Bilgiler(*)"}>
            <InputComp name={'name'} inputText={"İsim"} onChange={onChangeHandler}
                       placeHolderTitle={"İsim giriniz.."}></InputComp>
            <InputComp name={'desc'} inputText={"Açıklama"} onChange={onChangeHandler}
                       placeHolderTitle={"Açıklama giriniz.."}></InputComp>
        </ProductGroupComp>
        <ProductGroupComp groupTitle={"Seo(*)"}>
            <InputComp inputText={"Url"} onChange={onChangeHandler} placeHolderTitle={"Seo Url"}
                       name={"seoUrl"}></InputComp>
            <InputComp inputText={"Açıklama"} onChange={onChangeHandler} placeHolderTitle={"Açıklama giriniz.."}
                       name={"seoDesc"}></InputComp>
        </ProductGroupComp>
        <ProductGroupComp groupTitle={"Diğer"}>
            <InputComp inputText={""} onChange={onChangeHandler} placeHolderTitle={"Kategori metni giriniz.."}
                       name={"categoryText"}></InputComp>
        </ProductGroupComp>
    </div>
}

export default AddCategory