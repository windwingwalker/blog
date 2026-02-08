import { Typography, Card, CardContent, CardActionArea, Box } from '@mui/material'
import { useCallback, useState } from "react";
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'

interface ZoomableImageProps {
  imagePath: string;
  alt: string;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({imagePath, alt}) => {
  const [imageIsZoomed, setImageIsZoomed] = useState<boolean>(false)
  const handleImageZoomChange = useCallback((shouldZoom: boolean) => {
    setImageIsZoomed(shouldZoom)
  }, [])

  return (
    <Card sx={{padding: 2}}>
        <ControlledZoom isZoomed={imageIsZoomed} onZoomChange={handleImageZoomChange}>
          <img alt={alt} src={imagePath} width="100%" />
        </ControlledZoom>
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {alt}
          </Typography>
        </CardContent>
      </Card>
  )

}

export default ZoomableImage;