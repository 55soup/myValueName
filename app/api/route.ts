import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)
 
export const runtime = 'edge'
 
export async function POST(req: Request) {
  const { prompt } = await req.json()
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    stream: true,
    temperature: 0.6,
    prompt: generatePrompt(prompt),
  })
 
  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}

function generatePrompt(prompt: any) {
  const capitalizedVariable =
  prompt[0].toUpperCase() + prompt.slice(1).toLowerCase();
  return `Suggest three names for an variable that is a superhero.

  Variable: 햄버거 타이쿤 게임에서 요리사 캐릭터 객체를 만들건데, 카멜케이스로 변수 이름 추천해줘.
  Names: chatName, burgerSpecialist, HambugerShaf
  Variable: 옷입히기 캐릭터의 오브젝트 변수 이름을 스네일케이스로 추천해줘
  Names: character_outfit, clothing_items, dress_up_object
  Variable: 세부정보 알람창을 띄우는 컴포넌트 이름을 추천해줘
  Names: DetailedInfoAlertComponent, InfoPopupComponent, InfoAlertBoxComponent, InfoModalComponent
  Variable: 세부정보 알림창이 열림, 닫힘의 여부를 가지고 있는 state 변수명을 추천해줘
  Names: isAlertOpen, isOpenAlert, alertVisible, isDetailsAlertVisible, showDetailAlert
  Variable: 이미지를 인식하는 컴포넌트의 변수명을 지어줘 파스칼케이스로
  Names: ImageRecognizer, ImageIdentification, mageRecognitionComponent
  Variable: 세부정보 알림창이 열림, 닫힘의 여부를 가지고 있는 state 변수명을 추천해줘 5개
  Names: isDetailsOpen, detailWindowOpen, infoPanelVisible, detailsVisible, notificationExpanded
  Variable: ${prompt}
  Names: `;
}
