import React, { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl';
import { Button, Card, CardContent, Checkbox, FormControlLabel, FormGroup, FormLabel, Grid, Typography } from '@mui/material';
import axios from 'axios';

function RecipeCategory(props) {

    const [list, setList] = useState([])
    const [isAnyItemChecked, setisAnyItemChecked] = useState(false)
    const [filterCatList, setfilterCatList] = useState([])


    useEffect(() => {
        fetchRecipeeList()

    }, [])
    const fetchRecipeeList = () => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
            .then(response => {
                const posts = response.data;
                setList(posts.meals)
            })

    }
    const handleListCategory = async (evt, value) => {
        if (evt.target.checked) {
            try {
                const resp = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`)
                let filterCatData = resp.data?.meals;
                setfilterCatList(filterCatData)
                setisAnyItemChecked(true)
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("error occurred");
        }
    }

    const renderFilterData = () => {
        let data = filterCatList?.map((item) => {
            return <Grid item xs={4}>
                <Card >
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {item.strMeal}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {item.idMeal}
                        </Typography>


                        <Button variant='text'
                            onClick={() => viewReceipeDetails(item.idMeal)}
                        >
                            View details
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
        })
        return data
    }
    const viewReceipeDetails = (idval) => {
        props.history.push({ 
            pathname: '/recipeData',
            state: idval
           })
    }
    return (
        <>
            <Typography variant='h3' align='center' justifyContent={"center"}>Recipee List</Typography>
            <Grid item xs={12}>
                <Grid container direction="row" justifyContent="space-between">
                    <Grid item xs={2}>
                        <FormControl component="fieldset" >
                            <FormLabel component="legend">
                                Popular Filters
                            </FormLabel>
                            <FormGroup style={{ paddingBottom: "20px" }}>
                                {list?.length > 0 &&
                                    list?.map((listCategory) => {
                                        return (
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        onChange={(evt) => {
                                                            handleListCategory(
                                                                evt, listCategory.strCategory
                                                            );
                                                        }}
                                                    />
                                                }
                                                label={`${listCategory.strCategory}`}
                                            />
                                        );
                                    })}
                            </FormGroup>
                        </FormControl>

                    </Grid>
                    <Grid item xs={10} style={{ padding: '2rem' }}>
                        <Grid container direction="row" justifyContent="space-evenly" alignItems={"center"} spacing={3}>
                            {!isAnyItemChecked ? list?.map((_list, index) => {
                                return <>
                                    <Grid item xs={4}>
                                        <Card >
                                            <CardContent>
                                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                    {_list.strCategory}
                                                </Typography>
                                            </CardContent>

                                        </Card>

                                    </Grid>
                                </>
                            }) : renderFilterData()}


                        </Grid>

                    </Grid>

                </Grid>
            </Grid>

        </>

    )
}

export default RecipeCategory