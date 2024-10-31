import numpy as np
import os
import cv2
from PIL import Image

class Manager:
    def __init__(self, path: str) -> None:
        self._images_path = path

    def upload(self, filename: str):
        self._cur_image = filename

    def get_cur_image(self) -> str:
        return self._cur_image
    
    def get_sobel_image(self) -> str:
        image = np.array(Image.open(os.path.join(self._images_path, self._cur_image)).convert('L'))
        sobel_x = np.array([[-1, 0, 1],
                            [-2, 0, 2],
                            [-1, 0, 1]])
        sobel_y = np.array([[-1, -2, -1],
                            [0, 0, 0],
                            [1, 2, 1]])
        result = np.zeros_like(image)
        for i in range(1, image.shape[0] - 1):
            for j in range(1, image.shape[1] - 1):
                region = image[i-1:i + 2, j-1: j+2]
                pixel_x = np.sum(region * sobel_x)
                pixel_y = np.sum(region * sobel_y)
                result[i, j] = np.sqrt(pixel_x ** 2 + pixel_y ** 2)

        result = (result / result.max()) * 255
        result = result.astype(np.uint8)
        result_image = Image.fromarray(result)
        filename = f"{self._cur_image}_boundaries.png"
        result_image.save(os.path.join(self._images_path, filename))
        return filename
    
    def get_linear_contrast(self) -> str:
        image = cv2.imread(os.path.join(self._images_path, self._cur_image), cv2.IMREAD_GRAYSCALE).astype(np.float32)
        min_val = np.min(image)
        max_val = np.max(image)
        contrasted = (image - min_val) / (max_val - min_val) * 255
        contrasted = contrasted.astype(np.uint8)
        filename = f"{self._cur_image}_linear.png"
        cv2.imwrite(os.path.join(self._images_path, filename), contrasted)
        return filename

    
    def get_histogram(self) -> str:
        image = cv2.imread(os.path.join(self._images_path, self._cur_image))
        if len(image.shape) == 3:
            channels = cv2.split(image)
            eq_channels = []
            for channel in channels:
                eq_channels.append(cv2.equalizeHist(channel))

            eq_image = cv2.merge(eq_channels)
        else:
            eq_image = cv2.equalizeHist(image)
        filename = f"{self._cur_image}_linear.png"
        cv2.imwrite(os.path.join(self._images_path, filename), eq_image)
        return filename
