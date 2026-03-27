import tkinter as tk
from tkinter import messagebox
def caesar_cipher(text, shift, mode, alphabet):
    result = ""
    alphabet_length = len(alphabet)
    for char in text:
        if char in alphabet:
            shift_amount = shift if mode == "encrypt" else -shift
            original_index = alphabet.index(char)
            shifted_index = (original_index + shift_amount) % alphabet_length
            result += alphabet[shifted_index]
        else:
            result += char
    return result
def encrypt():
    text = input_text.get("1.0", tk.END).strip()
    shift = int(shift_entry.get())
    custom_alphabet = alphabet_entry.get().strip() or alphabet
    encrypted_text = caesar_cipher(text, shift, "encrypt", custom_alphabet)
    output_text.delete("1.0", tk.END)
    output_text.insert(tk.END, encrypted_text)
def decrypt():
    text = input_text.get("1.0", tk.END).strip()
    shift = int(shift_entry.get())
    custom_alphabet = alphabet_entry.get().strip() or alphabet
    decrypted_text = caesar_cipher(text, shift, "decrypt", custom_alphabet)
    output_text.delete("1.0", tk.END)
    output_text.insert(tk.END, decrypted_text)
alphabet = "абвгдеёжзійклмнопрстуўфхцчшыьэюяАБВГДЕЁЖЗІЙКЛМНОПРСТУЎФХЦЧШЫЬЭЮЯ"
root = tk.Tk()
root.title("Caesar Cipher Belarusian Language (CCBL)")
alphabet_label = tk.Label(root, text="Custom Alphabet:")
alphabet_label.pack()
alphabet_entry = tk.Entry(root)
alphabet_entry.pack()
input_label = tk.Label(root, text="Input Text:")
input_label.pack()
input_text = tk.Text(root, height=10, width=50)
input_text.pack()
shift_label = tk.Label(root, text="Shift Value:")
shift_label.pack()
shift_entry = tk.Entry(root)
shift_entry.pack()
encrypt_button = tk.Button(root, text="Encrypt", command=encrypt)
encrypt_button.pack()
decrypt_button = tk.Button(root, text="Decrypt", command=decrypt)
decrypt_button.pack()
output_label = tk.Label(root, text="Output Text:")
output_label.pack()
output_text = tk.Text(root, height=10, width=50)
output_text.pack()
root.mainloop()
