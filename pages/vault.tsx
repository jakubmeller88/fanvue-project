import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Paper, Box, Grid, Modal, Chip, Stack } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 2,
};

type Image = {
  albumId: number;
  id: number;
  title: string;
  thumbnailUrl: string;
  url: string;
};

const Feed: NextPage = () => {
  const imagesDataUrl =
    "https://jsonplaceholder.typicode.com/albums/1/photos?_limit=10";
  const [imagesData, setImagesData] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [loadingState, setLoadingState] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoadingState(true);
    fetch(imagesDataUrl)
      .then((response) => response.json())
      .then((data) => {
        setImagesData(data);
      })
      .finally(() => setLoadingState(false))
      .catch((err) => {
        setError(err);
      });
  }, []);

  return (
    <Grid>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 500,
        }}
      >
        <Chip label="images" />
        <Chip label="gallery" />
        <Chip label="social" />
      </Stack>
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: "800px",
          flexGrow: 1,
        }}
      >
        <>
          {!imagesData && <h2>{error}</h2>}
          {loadingState && (
            <Box>
              <h2>Loading ...</h2>
            </Box>
          )}

          <Grid container spacing={3}>
            {imagesData.length &&
              imagesData.map((image) => {
                return (
                  <Grid item key={image.id}>
                    {image.thumbnailUrl && (
                      <>
                        <img
                          onClick={() => handleOpen()}
                          src={image.thumbnailUrl}
                          alt=""
                        />
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <img src={image.url} alt="" />
                          </Box>
                        </Modal>
                      </>
                      // )}
                    )}
                  </Grid>
                );
              })}
          </Grid>
        </>
      </Paper>
    </Grid>
  );
};

export default Feed;
