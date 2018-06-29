var saveAs = saveAs || "undefined" != typeof navigator && navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator) || function (view) {
	if("undefined" != typeof navigator && /MSIE [1-9]\./.test(navigator.userAgent)) return;
	var doc = view.document,
		get_URL = function() {
			return view.URL || view.webkitURL || view
		},
		save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a"),
		can_use_save_link = !view.externalHost && "download" in save_link,
		click = function(node) {
			var event = doc.createEvent("MouseEvents");
			event.initMouseEvent("click", !0, !1, view, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null);
			node.dispatchEvent(event)
		},
		webkit_req_fs = view.webkitRequestFileSystem,
		req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem,
		throw_outside = function(ex) {
			(view.setImmediate || view.setTimeout)(function() {
					throw ex
				},
				0)
		},
		force_saveable_type = "application/octet-stream",
		fs_min_size = 0,
		deletion_queue = [],
		process_deletion_queue = function() {
			var file, i = deletion_queue.length;
			for(; i--;) {
				file = deletion_queue[i];
				"string" == typeof file ? get_URL().revokeObjectURL(file) : file.remove()
			}
			deletion_queue.length = 0
		},
		dispatch = function(filesaver, event_types, event) {
			var i, listener;
			event_types = [].concat(event_types);
			i = event_types.length;
			for(; i--;) {
				listener = filesaver["on" + event_types[i]];
				if("function" == typeof listener) try {
					listener.call(filesaver, event || filesaver)
				} catch(ex) {
					throw_outside(ex)
				}
			}
		},
		FileSaver = function(blob, name) {
			var object_url, target_view, slice, filesaver = this,
				type = blob.type,
				blob_changed = !1,
				get_object_url = function() {
					var object_url = get_URL().createObjectURL(blob);
					deletion_queue.push(object_url);
					return object_url
				},
				dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "))
				},
				fs_error = function() {
					!blob_changed && object_url || (object_url = get_object_url(blob));
					if(target_view) target_view.location.href = object_url;
					else {
						var win = window.open(object_url, "_blank");
						win.opener = null;
						win.location = object_url
					}
					filesaver.readyState = filesaver.DONE;
					dispatch_all()
				},
				abortable = function(func) {
					return function() {
						if(filesaver.readyState !== filesaver.DONE) return func.apply(this, arguments)
					}
				},
				create_if_not_found = {
					"create": !0,
					"exclusive": !1
				};
			filesaver.readyState = filesaver.INIT;
			name || (name = "download");
			if(can_use_save_link) {
				object_url = get_object_url(blob);
				save_link.href = object_url;
				save_link.download = name;
				click(save_link);
				filesaver.readyState = filesaver.DONE;
				dispatch_all();
				return
			}
			if(view.chrome && type && type !== force_saveable_type) {
				slice = blob.slice || blob.webkitSlice;
				blob = slice.call(blob, 0, blob.size, force_saveable_type);
				blob_changed = !0
			}
			webkit_req_fs && "download" !== name && (name += ".download");
			(type === force_saveable_type || webkit_req_fs) && (target_view = view);
			if(!req_fs) {
				fs_error();
				return
			}
			fs_min_size += blob.size;
			req_fs(view.TEMPORARY, fs_min_size, abortable(function(fs) {
				fs.root.getDirectory("saved", create_if_not_found, abortable(function(dir) {
					var save = function() {
						dir.getFile(name, create_if_not_found, abortable(function(file) {
							file.createWriter(abortable(function(writer) {
								writer.onwriteend = function(event) {
									target_view.location.href = file.toURL();
									deletion_queue.push(file);
									filesaver.readyState = filesaver.DONE;
									dispatch(filesaver, "writeend", event)
								};
								writer.onerror = function() {
									var error = writer.error;
									error.code !== error.ABORT_ERR && fs_error()
								};
								"writestart progress write abort".split(" ").forEach(function(event) {
									writer["on" + event] = filesaver["on" + event]
								});
								writer.write(blob);
								filesaver.abort = function() {
									writer.abort();
									filesaver.readyState = filesaver.DONE
								};
								filesaver.readyState = filesaver.WRITING
							}), fs_error)
						}), fs_error)
					};
					dir.getFile(name, {
							"create": !1
						},
						abortable(function(file) {
							file.remove();
							save()
						}), abortable(function(ex) {
							ex.code === ex.NOT_FOUND_ERR ? save() : fs_error()
						}))
				}), fs_error)
			}), fs_error)
		},
		FS_proto = FileSaver.prototype,
		saveAs = function(blob, name) {
			return new FileSaver(blob, name)
		};
	FS_proto.abort = function() {
		var filesaver = this;
		filesaver.readyState = filesaver.DONE;
		dispatch(filesaver, "abort")
	};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;
	FS_proto.error = FS_proto.onwritestart = FS_proto.onprogress = FS_proto.onwrite = FS_proto.onabort = FS_proto.onerror = FS_proto.onwriteend = null;
	view.addEventListener("unload", process_deletion_queue, !1);
	saveAs.unload = function() {
		process_deletion_queue();
		view.removeEventListener("unload", process_deletion_queue, !1)
	};
	return saveAs
}("undefined" != typeof self && self || "undefined" != typeof window && window || this.content)



String.prototype.endsWithAny = function() {
	var i, strArray = Array.prototype.slice.call(arguments),
		$this = this.toLowerCase().toString();
	for(i = 0; i < strArray.length; i++)
		if(-1 !== $this.indexOf(strArray[i], $this.length - strArray[i].length)) return !0;
	return !1
};


export function SaveTextAs(textContent, fileName, charset) {
	var blob, saveTxtWindow, doc, retValue;
	fileName = fileName || "download.txt";
	charset = charset || "utf-8";
	textContent = (textContent || "").replace(/\r?\n/g, "\r\n");
	//判断是否支持blob对象
	if(saveAs && Blob) {
		blob = new Blob([textContent], {
			"type": "text/plain;charset=" + charset
		});
		saveAs(blob, fileName);
		return !0
	}
	//如果不支持，使用iframe
	saveTxtWindow = window.frames.saveTxtWindow;
	//不支持直接创建
	if(!saveTxtWindow) {
		saveTxtWindow = document.createElement("iframe");
		saveTxtWindow.id = "saveTxtWindow";
		saveTxtWindow.style.display = "none";
		document.body.insertBefore(saveTxtWindow, null);
		saveTxtWindow = window.frames.saveTxtWindow;
		if(!saveTxtWindow) {
			saveTxtWindow = window.open("", "_temp", "width=100,height=100");
			saveTxtWindow.opener = null;
			if(!saveTxtWindow) {
				window.alert("Sorry, download file could not be created.");
				return !1
			}
		}
	}
	doc = saveTxtWindow.document;
	doc.open("text/plain", "replace");
	doc.charset = charset;
	if(fileName.endsWithAny(".htm", ".html")) {
		doc.close();
		doc.body.innerHTML = "\r\n" + textContent + "\r\n"
	} else {
		fileName.endsWithAny(".txt") || (fileName += ".txt");
		doc.write(textContent);
		doc.close()
	}
	retValue = doc.execCommand("SaveAs", null, fileName);
	saveTxtWindow.close();
	return retValue
}