const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'A', url: 'https://www.acfun.cn' },
    { logo: 'B', url: 'https://www.bilibili.com' },
    { logo: 'G', url: 'https://www.gitee.com' },
    { logo: 'Z', url: 'https://www.zhihu.com' },
]

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/) //删除以 / 开头的内容
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon" >
                        <use xlink:href="#icon-close-bold"></use>
                    </svg>
                </div>
            </div> 
    </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() //阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()

$('.addButton').on('click', () => {
    let url = window.prompt('你要添加啥？')

    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    console.log(url)
    hashMap.push({ logo: simplifyUrl(url)[0].toUpperCase(), url: url })
    //simplifyUrl(url)[0].toUpperCase()
    //取简化后的url的第一个字母，再转成大写
    render()
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

//点击键盘按键自动跳转网站
$(document).on('keypress', (e) => {
    const { key } = e
    console.log(key)
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
            //toLowerCase() 把字母变成小写
        }
    }
})

//阻止输入框按键冒泡
$('.searchForm').on('keypress', (e) => {
    e.stopPropagation()
})