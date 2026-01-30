// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const tabs = document.querySelectorAll('.tab');
    const quickLinks = document.querySelectorAll('.quick-links a');
    const siteItems = document.querySelectorAll('.site-item');
    
    // 搜索功能实现
    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // 模拟搜索行为
            console.log('搜索内容:', query);
            
            // 这里可以添加真实的搜索逻辑，比如跳转到搜索结果页
            // window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            
            // 模拟搜索延迟和反馈
            searchButton.textContent = '搜索中...';
            searchButton.disabled = true;
            
            setTimeout(() => {
                searchButton.textContent = '搜索';
                searchButton.disabled = false;
                
                // 显示搜索成功提示
                alert(`已搜索: ${query}\n\n这是一个模拟搜索，实际项目中会跳转到搜索结果页`);
            }, 1000);
        } else {
            alert('请输入搜索内容');
        }
    }
    
    // 搜索按钮点击事件
    searchButton.addEventListener('click', performSearch);
    
    // 回车键搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 搜索标签切换功能
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有标签的活动状态
            tabs.forEach(t => t.classList.remove('active'));
            // 添加当前标签的活动状态
            this.classList.add('active');
            
            // 这里可以添加切换搜索类型的逻辑
            console.log('切换到搜索类型:', this.textContent);
        });
    });
    
    // 快速链接点击事件
    quickLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent;
            
            switch(linkText) {
                case '热门搜索':
                    showHotSearches();
                    break;
                case '历史记录':
                    showSearchHistory();
                    break;
                case '设置':
                    showSettings();
                    break;
            }
        });
    });
    
    // 常用网站点击事件
    siteItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const siteName = this.querySelector('span').textContent;
            console.log('访问网站:', siteName);
            
            // 跳转到对应网站
            window.open(getSiteUrl(siteName), '_blank');
        });
    });
    
    // 显示热门搜索
    function showHotSearches() {
        const hotSearches = [
            '最新科技新闻',
            '天气预报',
            '股票行情',
            '热门电影',
            '体育赛事结果'
        ];
        
        let hotSearchesHtml = '<h4>热门搜索</h4><ul>';
        hotSearches.forEach(search => {
            hotSearchesHtml += `<li><a href="#" onclick="document.getElementById(\'search-input\').value=\'${search}\'; return false;">${search}</a></li>`;
        });
        hotSearchesHtml += '</ul>';
        
        showModal('热门搜索', hotSearchesHtml);
    }
    
    // 显示搜索历史
    function showSearchHistory() {
        // 从localStorage获取搜索历史
        const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        
        let historyHtml = '<h4>搜索历史</h4>';
        if (history.length > 0) {
            historyHtml += '<ul>';
            history.forEach(item => {
                historyHtml += `<li><a href="#" onclick="document.getElementById(\'search-input\').value=\'${item}\'; return false;">${item}</a></li>`;
            });
            historyHtml += '</ul>';
            historyHtml += '<button onclick="clearSearchHistory()" style="margin-top: 10px; padding: 5px 10px; background-color: #f0f0f0; border: none; border-radius: 4px; cursor: pointer;">清空历史</button>';
        } else {
            historyHtml += '<p>暂无搜索历史</p>';
        }
        
        showModal('搜索历史', historyHtml);
    }
    
    // 显示设置
    function showSettings() {
        const settingsHtml = `
            <h4>搜索设置</h4>
            <div style="text-align: left; padding: 10px;">
                <label><input type="checkbox" checked> 启用安全搜索</label><br>
                <label><input type="checkbox" checked> 保存搜索历史</label><br>
                <label><input type="checkbox"> 显示实时搜索建议</label><br>
                <button onclick="saveSettings()" style="margin-top: 15px; padding: 8px 15px; background-color: #1a73e8; color: white; border: none; border-radius: 4px; cursor: pointer;">保存设置</button>
            </div>
        `;
        
        showModal('搜索设置', settingsHtml);
    }
    
    // 保存搜索历史
    function saveSearchHistory(query) {
        const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        
        // 移除重复项
        const filteredHistory = history.filter(item => item !== query);
        
        // 添加到历史记录开头
        filteredHistory.unshift(query);
        
        // 限制历史记录数量
        const limitedHistory = filteredHistory.slice(0, 10);
        
        localStorage.setItem('searchHistory', JSON.stringify(limitedHistory));
    }
    
    // 清空搜索历史
    window.clearSearchHistory = function() {
        localStorage.removeItem('searchHistory');
        showSearchHistory();
    };
    
    // 保存设置
    window.saveSettings = function() {
        // 这里可以添加保存设置的逻辑
        alert('设置已保存');
        closeModal();
    };
    
    // 显示模态框
    function showModal(title, content) {
        // 创建模态框元素
        let modal = document.getElementById('modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'modal';
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            `;
            document.body.appendChild(modal);
        }
        
        // 创建模态框内容
        modal.innerHTML = `
            <div style="
                background-color: white;
                border-radius: 8px;
                padding: 20px;
                width: 90%;
                max-width: 500px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h3 style="margin: 0;">${title}</h3>
                    <button onclick="closeModal()" style="
                        background: none;
                        border: none;
                        font-size: 20px;
                        cursor: pointer;
                        color: #666;
                    ">&times;</button>
                </div>
                <div>${content}</div>
            </div>
        `;
        
        // 显示模态框
        modal.style.display = 'flex';
    }
    
    // 关闭模态框
    window.closeModal = function() {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.style.display = 'none';
        }
    };
    
    // 点击模态框外部关闭
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('modal');
        if (modal && e.target === modal) {
            closeModal();
        }
    });
    
    // 获取网站URL（模拟）
    function getSiteUrl(siteName) {
        const siteUrls = {
            '百度': 'https://www.baidu.com',
            '谷歌': 'https://google.com',
            '邮箱': 'https://mail.google.com',
            '音乐': 'https://music.youtube.com',
            '视频': 'https://www.youtube.com',
            '应用': 'https://play.google.com'
        };
        
        return siteUrls[siteName] || '#';
    }
    
    // 添加搜索输入框的焦点和失焦效果
    searchInput.addEventListener('focus', function() {
        this.parentElement.style.boxShadow = '0 0 0 3px rgba(26, 115, 232, 0.1)';
    });
    
    searchInput.addEventListener('blur', function() {
        this.parentElement.style.boxShadow = 'none';
    });
    
    // 添加页面滚动效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            header.style.padding = '5px 0';
        } else {
            header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            header.style.padding = '10px 0';
        }
    });
    
    console.log('搜索引擎主页功能已加载完成');
});

// 全局函数，用于从模态框中调用
function clearSearchHistory() {
    localStorage.removeItem('searchHistory');
    document.getElementById('modal').querySelector('ul').innerHTML = '<p>暂无搜索历史</p>';
    document.querySelector('button[onclick="clearSearchHistory()"]').style.display = 'none';
}

function saveSettings() {
    alert('设置已保存');
    closeModal();
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
    }
}