export function readFile(event) {
	var ele, filePath, index, fileName, fileContent, fso, file2, url, text, msg, file, reader, self = {
		text:'',
		name:'',
		filename:''
	};
	
	ele = event.target;
	if(!ele.files) {
		filePath = ele.value;
		if(filePath) {
			index = filePath.lastIndexOf("\\") || filePath.lastIndexOf("/");
			fileName = filePath.substring(index + 1);
			self.name = fileName.substring(0,file.name.indexOf("."));
			self.filename = fileName.substring(0,file.name.indexOf("."));
			fileContent = "";
			try {
				fso = new ActiveXObject("Scripting.FileSystemObject");
				file2 = fso.OpenTextFile(filePath, 1);
				fileContent = file2.ReadAll();
				file2.Close()
			} catch(e) {
				/*url = '';
				text = '启动ActiveX插件操作说明';
				msg = validator.i18nReplace($scope.i18n.keypair_term_activeX_msg, {
					"1": "<a target='_blank' href='" + url + "'>" + text + "</a>"
				});
				warnMsg(msg);*/
				console.log('未启动插件')
				return
			}
			self.text = fileContent
		} else {
			self.name = "";
			self.filename = "未选择任何文件"
		}
		
		return
	}
	file = ele.files[0];
	
	if(!file) {
		self.name = "";
		self.filename = "未选择任何文件";
		
		return
	}
	
	self.name = file.name.substring(0,file.name.indexOf("."));
	self.filename = file.name.substring(0,file.name.indexOf("."));
	if(file) {
		reader = new FileReader;
		reader.onload = function(theFile) {
			return function(e) {
				var result = e.target.result;
				self.text = result;
			}
		}();
		reader.readAsText(file, "UTF-8")
	}
	return self
}