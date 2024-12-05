import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { addFood, getById, updateFood } from "../../services/foodService";
import { toast } from "react-toastify";
import classes from './foodEditPage.module.css'
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
const FoodEditPage = () => {
    const {foodId} = useParams();
    //const [image, setImage] = useState();
    const isEditMode = !!foodId;

    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState : {errors},
        reset,
    } = useForm();

    useEffect(() => {
        if(!isEditMode) return;
        getById(foodId).then(food => {
            if(!food) return;
            reset(food);
            //setImage(food.image);
        });
    }, [foodId]);

    const submit = async foodData => {
        

        if(isEditMode){
            const confirmed = window.confirm("Bạn có chắc muốn thay đổi không?");
            if(!confirmed) return;
            await updateFood(foodId, foodData);
            navigate('/admin/foods', {replace : true});
            toast.success(`"${foodData.name}" Thay đổi thành công!`);
            console.log("vui ve")
            return;
        }
        console.log(foodData);
        const newFood = await addFood(foodData);
        navigate('/admin/foods', {replace : true});
        toast.success(`"${foodData.name}" Thêm thành công!`);
        console.log("vui ve")
    };

    // const upload = async event => {
    //     setImage(null);
    //     const imageUrl = await uploadImage(event);
    //     setImage(imageUrl);
    // };

    return (
        <>
            <Header/>
            <div className={classes.container}>
                <div className={classes.content}>
                    <Title title={isEditMode ? 'Sửa món ăn' : 'Thêm món ăn'} color = {"black"} margin={"1rem 0 0 0"}/>
                    <form
                        className = {classes.form}
                        onSubmit={handleSubmit(submit)}
                        noValidate
                    >

                        <Input
                            type="text"
                            label="Name"
                            {...register('name', { required: true, minLength: 1 })}
                            error={errors.name}
                        />

                        <Input
                            type="number"
                            label="Price"
                            {...register('price', { required: true })}
                            error={errors.price}
                        />

                        <Input
                            type="text"
                            label="Description"
                            {...register('description')}
                            error={errors.description}
                        />


                        <Input
                            type="text"
                            label="Image"
                            {...register('image', { required: true })}
                            error={errors.image}
                        />
                        <Button type="submit" text={isEditMode ? 'Cập nhật' : 'Thêm mới'} />
                    </form>
                </div>
            </div>
            <Footer/>
        </>
        
    )
}

export default FoodEditPage;
