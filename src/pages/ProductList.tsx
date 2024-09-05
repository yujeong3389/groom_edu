import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Grid, TextField} from '@mui/material';
import React from 'react';
import { ProductsThumbnail } from '../components/ProductsThumbnail';
import { cartItemVar } from '../cache';
import cuid from 'cuid';
import { GetProductsQuery } from '../gql/graphql';
// import isEqual from 'lodash/isEqual';
interface ProductListProps{
    products?:GetProductsQuery["products"];
    search?:string;
}
function areEqual(prev: ProductListProps, next: ProductListProps) {
    // return isEqual(prev, next);
}
const ProductList=({products,search=''}:ProductListProps)=>{
    console.log("타이핑 할 때마다 리렌더링됨")
    return(
    <Grid container justifyContent="center" spacing={2} paddingTop="56px">
                {[...new Array(10)].flatMap(() =>
                    products?.filter(({ name }: { name: string }) => {
                    const regexVar = new RegExp(search, 'g');
                    return name.search(regexVar) !== -1;
                    })
                    .map((props: any) => (
                    <Grid item xs={6} md={4} key={cuid()}>
                        <ProductsThumbnail
                        onClick={() => {
                            const allCartItems = cartItemVar();
                            cartItemVar([
                            ...allCartItems,
                            {
                                id: cuid(),
                                product: props,
                                amount: 1,
                            },
                            ]);
                        }}
                        {...props}
                        />
                    </Grid>
                    ))
                )}
                </Grid>
)}

// const ProductList=React.memo(({products,search=''}:ProductListProps)=>{
//     console.log("타이핑 할 때마다 리렌더링됨")
//     return(
//     <Grid container justifyContent="center" spacing={2} paddingTop="56px">
//                 {[...new Array(10)].flatMap(() =>
//                     products?.filter(({ name }: { name: string }) => {
//                     const regexVar = new RegExp(search, 'g');
//                     return name.search(regexVar) !== -1;
//                     })
//                     .map((props: any) => (
//                     <Grid item xs={6} md={4} key={cuid()}>
//                         <ProductsThumbnail
//                         onClick={() => {
//                             const allCartItems = cartItemVar();
//                             cartItemVar([
//                             ...allCartItems,
//                             {
//                                 id: cuid(),
//                                 product: props,
//                                 amount: 1,
//                             },
//                             ]);
//                         }}
//                         {...props}
//                         />
//                     </Grid>
//                     ))
//                 )}
//                 </Grid>
// )},areEqual)

export default ProductList;