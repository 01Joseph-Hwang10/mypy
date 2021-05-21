# MYPY

## 요약

제가 배포하려고 하는 앱의 이름은 MYPY라고 하는 앱입니다.
이 앱의 주요기능은 파이썬으로 작성된 앱을 디플로이 해주고,
파이썬 스크립트로만 작성된 앱에 UI를 만들어 마치 진짜 앱을 쓰는듯한
경험을 제공합니다. 헥사 서버에 디플로이 하게 된다면 프로토타이핑을 비롯해
서버의 상태를 모니터링하는 등 만약 추후에 제가 이 앱의 규모를 키워간다면 참고가 될 수 있는
여러 실험을 진행해볼 예정입니다.

## 앱의 이름에 대해서

제가 현재 생각하고 있는 이름은 MYPY supported by HeXA이나, 더 직접적으로 동아리 이름을 넣어야 한다면
MYPY_HeXA나 HeXA_MYPY로 하는 것도 좋습니다.

## 예시

파이썬으로 만든 계산기 앱을 디플로이 하는 과정을 예로 설명드리겠습니다.
앱의 폴더구조와 각각의 스크립트는 다음과 같습니다

weird_calculator

---

|- index.py

---

|- add_two_numbers.py

```python
# index.py
from add import add_two_numbers

a=float()
b=int()

def main():

    result = add_two_numbers(a,b)

    return result

```

```python
# add_two_numbers.py

def add_two_numbers(a,b):
    return a+b
```

MYPY는 앱의 루트폴더에 있는 index.py에 main 함수의 리턴값을 MYPY에 디플로이된 앱의 output으로 돌려줍니다.
그리고 main 함수 위에 정의되어있는 `a=float()` , `b=int()` 를 MYPY는 클라이언트로부터 받을 Input으로 인식합니다.

이 앱을 .zip으로 압축해서 MYPY에 올리면, 다음과 같은 앱 화면 페이지가 표시됩니다.

!['App_page_1'](https://raw.githubusercontent.com/01Joseph-Hwang10/mypy/master/demonstration1.PNG)
!['App_page_2'](https://raw.githubusercontent.com/01Joseph-Hwang10/mypy/master/demonstration2.PNG)
!['App_page_3'](https://raw.githubusercontent.com/01Joseph-Hwang10/mypy/master/demonstration3.PNG)

위의 앱 페이지에서, 인풋에 값들을 넣고 RUN을 누르면 위의 스크립트들이 실행되고 main() 함수의 리턴값이 result에 반환됩니다.

계산기는 매우 간단한 예시였고, MYPY의 활용은 파이썬으로 만들수 있는 웹크롤러나 복잡한 Input processor 등으로 확장 가능합니다.

P.S. 혹시 궁금한 사항이 있으시다면 물어봐주셔도 좋습니다!
