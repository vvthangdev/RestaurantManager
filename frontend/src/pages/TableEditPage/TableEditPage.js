import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { addFood, getById, updateFood } from "../../services/foodService";
import { toast } from "react-toastify";
import classes from './tableEditPage.module.css'
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HeaderFoodsAdminPage from "../../components/HeaderFoodsAdmin/HeaderAdmin";
import { addTable, getTableByTableNumber, updateTable } from "../../services/tableService";

const TableEditPage = () => {
    const {table_number} = useParams();
    //const [image, setImage] = useState();
    const isEditMode = !!table_number;

    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState : {errors},
        reset,
    } = useForm();

    useEffect(() => {
        if(!isEditMode) return;
        getTableByTableNumber(table_number).then(table_number => {
            if(!table_number) return;
            reset(table_number);
            //setImage(food.image);
        });
    }, [table_number]);

    const submit = async tableData => {
        

        if(isEditMode){
            const confirmed = window.confirm("Bạn có chắc muốn thay đổi không?");
            if(!confirmed) return;
            await updateTable(table_number, tableData);
            toast.success(`"Bàn ${table_number}" Thay đổi thành công!`);
            navigate('/admin/tablemanagement', {replace : true});
            console.log("vui ve")
            return;
        }
        console.log(tableData);
        const newTable = addTable(tableData)
        toast.success(`"Bàn ${tableData.table_number}" Thêm thành công!`);
        navigate('/admin/tablemanagement', {replace : true});
        console.log("vui ve")
    };

    // const upload = async event => {
    //     setImage(null);
    //     const imageUrl = await uploadImage(event);
    //     setImage(imageUrl);
    // };
    
    return (
        <>
            <HeaderFoodsAdminPage/>
            <div className={classes.container}>
                <div className={classes.content}>
                    <Title title={isEditMode ? 'Sửa bàn' : 'Thêm bàn'} color = {"black"} margin={"1rem 0 0 0"}/>
                    <form
                        className = {classes.form}
                        onSubmit={handleSubmit(submit)}
                        noValidate
                        accept-charset="UTF-8"
                    >

                        
                        {!isEditMode &&
                            <Input
                            type="text"
                            label="Bàn"
                            {...register('table_number', { required: true })}
                            error={errors.table_number}
                        />}
                        {isEditMode &&
                            <div className={classes.table}>Bàn {table_number}</div>    
                        }
                    
                        <Input
                            type="number"
                            label="Sức chứa"
                            {...register('capacity', { required: true })}
                            error={errors.capacity}
                        />

                        <Button type="submit" text={isEditMode ? 'Cập nhật' : 'Thêm mới'} />
                    </form>
                </div>
            </div>
            <Footer/>
        </>
        
    )
}

export default TableEditPage;
