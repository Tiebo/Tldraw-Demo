import oss2
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()
# 启用 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有域名，生产环境应限制为具体域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# 阿里云 OSS 配置
ACCESS_KEY_ID = ''
ACCESS_KEY_SECRET = ''
ENDPOINT = 'https://oss-cn-beijing.aliyuncs.com'
BUCKET_NAME = 'tldraw'

# 初始化 OSS Bucket
auth = oss2.Auth(ACCESS_KEY_ID, ACCESS_KEY_SECRET)
bucket = oss2.Bucket(auth, ENDPOINT, BUCKET_NAME)

@app.get("/list-images/")
async def list_images(folder: str):
    if not folder.endswith('/'):
        folder += '/'

    image_urls = []
    for obj in oss2.ObjectIterator(bucket, prefix=folder):
        if obj.key.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp')):
            url = bucket.sign_url('GET', obj.key, 3600)  # 3600 秒内有效
            url = url.split('?')[0]
            image_urls.append(url)
    return {"images": image_urls}
