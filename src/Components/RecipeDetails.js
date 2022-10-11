import { Button, Card, CardContent, Grid, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function RecipeDetails(props) {
    const [details, setdetails] = useState([])
    useEffect(() => {
        getRecipeDetais()
    }, [])
    const getRecipeDetais = () => {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${props.location.state}`
        console.log("url", url);
        axios.get(url)
            .then(response => {
                const posts = response.data;
                setdetails(posts.meals)
            })
    }
    return (
        <>
            <Grid container direction={"row"} justifyContent="center">
                <Grid item xs={12} md={8} sx={{ padding: '5rem' }}>
                    {details?.map((_item) => {
                        return <Card >
                            <CardContent>
                                <Typography variant='h5' sx={{ fontWeight: 'normal' }}>Meal name:-{_item.strMeal}</Typography>
                                <Typography sx={{ textAlign: 'start', textDecoration: 'underline' }} variant="h6">Instruction</Typography>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {_item.strInstructions}
                                </Typography>
                                <Button><a href="https://www.bbcgoodfood.com/recipes/1269/chilli-prawn-linguine" style={{textDecoration:'none'}}>Reference</a></Button>
                                <Button><a style={{textDecoration:'none'}} href="https://www.bbcgoodfood.com/recipes/1269/chilli-prawn-linguine">Video</a></Button>
                                <Button onClick={() => props.history.push("/")}>Go back</Button>

                            </CardContent>
                        </Card>
                    })}

                </Grid>

            </Grid>
        </>
    )
}

export default RecipeDetails