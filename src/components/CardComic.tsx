import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import React, { useState } from "react";
import { IComic } from '../interfaces/comics';


interface props {
  comic: IComic,
  clickAction: () => void,
  text: string
}


const CardComic = ({ comic, clickAction, text }: props) => {

  // const { addCart } = useCart();

  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
  const handleClose = () => {
    setIsOpenDialog(false);
  };

  if (isOpenDialog) {
    return (

      <div>
        <Dialog
          open={isOpenDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">

            {`#${comic.id}=${comic.title}`}
          </DialogTitle>

          <div className="teste">
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {comic.description}
                <img className="img-quadro"
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                /><br />
              </DialogContentText>

            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose}>Fechar</Button>
            </DialogActions>
          </div>
        </Dialog>
      </div>
    )
  }

  return (

    <Card sx={{ maxWidth: 200 }}>
      <CardMedia
        component="img"
        // height="200"
        image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
        alt={comic.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {comic.title}
        </Typography>

      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => { setIsOpenDialog(true) }}>Exibir Detalhes</Button>

        {/* Botão para enviar para a lista (carrinho) */}
        <Button size="small" onClick={() => {
          clickAction()
        }}>{text}</Button>
      </CardActions>
    </Card>

  );
}

export default CardComic;