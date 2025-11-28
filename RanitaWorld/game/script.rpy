# Coloca el código de tu juego en este archivo.

# Declara los personajes usados en el juego como en el ejemplo:

define raniProta = Character("[RanitaProta]")


# El juego comienza aquí.

label start:
    python:
        raniProta = renpy.input("Ingresa tu nombre", length=32)
        raniProta = raniProta.strip()
    
        if not raniProta:
            raniProta = "Ranita"
    # Presenta las líneas del diálogo.

    raniProta "¡Hola! me llamo [raniProta], y soy una ranita aventurera."

    # Finaliza el juego:

    return