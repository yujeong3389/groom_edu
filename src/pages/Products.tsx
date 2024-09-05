import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Grid, TextField} from '@mui/material';
import React from 'react';
import { ProductsThumbnail } from '../components/ProductsThumbnail';
import { cartItemVar } from '../cache';
import cuid from 'cuid';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Add } from '@mui/icons-material';
import ProductList from './ProductList';

//grid는 container(상위 요소)와 item(하위 요소)으로 구성된다.
//MUI의 Grid 컴포넌트에서 xs, sm, md, lg, xl 속성을 사용하면 다양한 화면 크기에 따라 
//그리드 아이템의 크기를 동적으로 설정할 수 있다. 
//이는 반응형 웹 디자인을 구현하는 데 매우 유용하다.
//ex) xs={12}모든 화면 크기에서 이 아이템은 전체 너비를 차지한다.
// sm={6}: 작은 화면(600px이상)dptjsms 50%의 너비를 차지한다.
//md={4}: 중간 화면(960px 이상)에서는 33.3%의 너비를 차지한다.
const GET_PRODUCTS=gql`
query GetProducts{
    products{
        id
        name
        price
        imgUrl
    }
}
`
const ADD_PRODUCT = gql`
  mutation AddProduct($name: String!, $price: Int!, $imgUrl: String!) {
    addProduct(name: $name, price: $price, imgUrl: $imgUrl) {
      id
    }
  }
`;
const Products = () => {
    const [open, setOpen] = React.useState(false);
    const [form, setForm]=React.useState({name:'',price:'',imgUrl:''});
    const [search, setSearch] = React.useState('');
    const [searchDraft, setSearchDraft] = React.useState('');
    const{name,price,imgUrl}=form;
    const{data,loading,error}=useQuery(GET_PRODUCTS);
    const [addProduct, { loading: mutationLoading }] = useMutation(ADD_PRODUCT, {
        onCompleted: () => {
          setOpen(false);
        },
        refetchQueries:['GetProducts']
      });
    
    if(loading) return <span>Loading..</span>;
    if(error) return <span>`Error! ${error.message}`</span>;
    
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTextChange=(e:any)=>{
    setForm(prev=>({...prev,[e.target.name]:e.target.value}))
  }

  const handleSubmit=()=>{
    addProduct({
        variables: {
            name,
            price: parseInt(price, 10), // price를 숫자로 변환
            imgUrl,
          },
    })
  }
    
    return (
        <div>
           <Container>
            <Box display="flex" justifyContent="center" mb={4}>
                <TextField 
                    variant='outlined'
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    label="상품명으로 검색"
                />
                <Button onClick={()=>setSearch(searchDraft)}variant='contained'>조회</Button>
            </Box>
            <ProductList products={data?.products} search={search}/>

            <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>상품 추가하기</DialogTitle>
        <DialogContent>
          <DialogContentText>
            뭐넣을래
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="상품명"
            fullWidth
            value={name}
            onChange={handleTextChange}
          />
           <TextField
            margin="dense"
            name="price"
            label="가격"
            fullWidth
            value={price}
            onChange={handleTextChange}
          />
           <TextField
            margin="dense"
            name="imgUrl"
            label="썸네일 이미지 주소"
            fullWidth
            value={imgUrl}
            onChange={handleTextChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Subscribe</Button>
        </DialogActions>
      </Dialog>
            <Fab style={{position:'fixed', bottom:'10px', right:'10px'}} color="primary" aria-label='add' onClick={handleClickOpen}>
                <Add/>
            </Fab>
           </Container>
        </div>
    );
};

export default Products;




   
    
